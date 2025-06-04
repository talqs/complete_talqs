from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import re
from sentence_transformers import SentenceTransformer, util


load_dotenv()

app = Flask(__name__)
CORS(app)


# embedder = SentenceTransformer('all-MiniLM-L6-v2')

# Load the model and tokenizer

model_path = r"C:\Users\RAMA\Downloads\working_prj_talqs\working_prj_talqs\backend_int\summ_model\final_model"
tokenizer_path = r"C:\Users\RAMA\Downloads\working_prj_talqs\working_prj_talqs\backend_int\summ_model\final_tokenizer"



model = T5ForConditionalGeneration.from_pretrained(model_path,local_files_only=True)
tokenizer = T5Tokenizer.from_pretrained(tokenizer_path,local_files_only=True)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
model.eval()  # set to eval mode — no gradient tracking needed!



# this is generating summary by taking context as entire text
# def summarize():
#     try:
#         data = request.json
#         context = data.get('text')

#         if not context:
#             return jsonify({"error": "Text is required"}), 400

#         question = "What is the summary of the judgment?"

#         input_text = f"Context: {context} Question: {question}"

#         inputs = tokenizer(
#             input_text,
#             return_tensors="pt",
#             truncation=True,
#             padding=True
#         ).to(device)

#         with torch.no_grad():
#             outputs = model.generate(
#                 input_ids=inputs["input_ids"],
#                 attention_mask=inputs["attention_mask"],
#                 max_length=150,
#                 num_beams=4,
#                 early_stopping=True
#             )

#         summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

#         return jsonify({"summary": summary})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500




# Function to extract metadata from the text
# This function uses regex to find the petitioner, respondent, and date of judgment
def extract_metadata(text):
    petitioner = re.search(r"PETITIONER[:\s]+(.+?)\s+Vs", text, re.IGNORECASE)
    respondent = re.search(r"RESPONDENT[:\s]+(.+?)\s+DATE", text, re.IGNORECASE)
    date = re.search(r'DATE OF JUDGMENT\s*:?(\d{1,2}/\d{1,2}/\d{4})', text, re.IGNORECASE)

    return {
        "petitioner": petitioner.group(1).strip() if petitioner else "Unknown",
        "respondent": respondent.group(1).strip() if respondent else "Unknown",
        "date": date.group(1).strip() if date else "Unknown"
    }


# Function to infer the judgment conclusion based on keywords
def infer_judgment_conclusion(text):
    lowered = text.lower()

    if any(phrase in lowered for phrase in ["appeal dismissed", "dismissed", "petition denied","dismiss"]):
        return "The appeal was dismissed, and the matter rests as decided."
    elif any(phrase in lowered for phrase in ["acquitted", "found not guilty"]):
        return "The accused was acquitted, walking free by the court's grace."
    elif any(phrase in lowered for phrase in ["convicted", "conviction upheld", "appeal allowed","is allowed"]):
        return "The appeal was allowed, and the conviction stood firm."
    elif "disposed of" in lowered or "disposed" in lowered:
        return "The case was disposed of with the court's observations."
    else:
        return "The judgment outcome could not be determined confidently."


# Function to summarize the text
@app.route('/api/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        context = data.get('text')

        if not context:
            return jsonify({"error": "Text is required"}), 400

        question = "What is the summary of the judgment?"

        max_input_length = 512
        chunk_overlap = 50

        tokens = tokenizer.encode(context, truncation=False)
        chunks = []
        start = 0
        while start < len(tokens):
            end = start + max_input_length
            chunk = tokens[start:end]
            chunks.append(chunk)
            start += max_input_length - chunk_overlap

        all_summaries = []

        for chunk in chunks:
            chunk_text = tokenizer.decode(chunk, skip_special_tokens=True)
            # input_text = f"Context: {chunk_text} Question: {question}"
            input_text = f"question: {question} context: {chunk_text}"

            inputs = tokenizer(
                input_text,
                return_tensors="pt",
                truncation=True,
                padding=True
            ).to(device)

            with torch.no_grad():
                outputs = model.generate(
                    input_ids=inputs["input_ids"],
                    attention_mask=inputs["attention_mask"],
                    max_length=150,
                    num_beams=5,
                    early_stopping=True,
                    repetition_penalty=1.4
                )

            chunk_summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
            all_summaries.append(chunk_summary)

        final_summary = "\n".join(all_summaries)



        #   # Optional post-summarization step

        # refined_input = f"Context: {final_summary} Question: Summarize this concisely."
        # inputs = tokenizer(refined_input, return_tensors="pt", truncation=True, padding=True).to(device)
        # with torch.no_grad():
        #     outputs = model.generate(
        #         input_ids=inputs["input_ids"],
        #         attention_mask=inputs["attention_mask"],
        #         max_length=150,
        #         num_beams=4,
        #         early_stopping=True
        #     )
        # refined_summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

        metadata = extract_metadata(context)
        conclusion = infer_judgment_conclusion(context)

        combined_summary = f"""Petitioner: {metadata.get('petitioner', 'N/A')}\nRespondent: {metadata.get('respondent', 'N/A')}\nDate: {metadata.get('date', 'N/A')}\n{final_summary}\n
        {conclusion}
        """

        return jsonify({"summary": combined_summary})


    except Exception as e:
        return jsonify({"error": str(e)}), 500





# this is for q n a from local model

# Load Sentence-BERT model only once (efficient)
embedder = SentenceTransformer('all-MiniLM-L6-v2')

class SemanticContextFilter:
    def __init__(self, chunk_size=100, top_k=3):
        self.chunk_size = chunk_size
        self.top_k = top_k

    def split_into_chunks(self, text):
        words = text.split()
        chunks = [' '.join(words[i:i + self.chunk_size]) for i in range(0, len(words), self.chunk_size)]
        return chunks

    def filter_context(self, full_text, question):
        chunks = self.split_into_chunks(full_text)
        question_embedding = embedder.encode(question, convert_to_tensor=True)
        chunk_embeddings = embedder.encode(chunks, convert_to_tensor=True)
        similarities = util.pytorch_cos_sim(question_embedding, chunk_embeddings)[0]
        top_k_indices = torch.topk(similarities, self.top_k).indices.tolist()
        selected_chunks = [chunks[i] for i in top_k_indices]
        return ' '.join(selected_chunks)

# Initialize filter once
context_filter = SemanticContextFilter(chunk_size=100, top_k=3)

@app.route('/api/question-answer', methods=['POST'])
def question_answer():
    try:
        data = request.json
        question = data.get('question')
        full_context = data.get('context')

        if not question or not full_context:
            return jsonify({"error": "Question and context are required"}), 400

        # 🔥 Filter down to relevant context
        filtered_context = context_filter.filter_context(full_context, question)

        # input_text = f"Context: {filtered_context} Question: {question}"
        input_text = f"question: {question} context: {filtered_context}"
        inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True).to(device)

        # 🕊 Generate answer
        with torch.no_grad():
            outputs = model.generate(
                input_ids=inputs["input_ids"],
                attention_mask=inputs["attention_mask"],
                max_length=100,
                num_beams=5,
                early_stopping=True,
                repetition_penalty=1.3
            )
        answer = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({
            "answer": answer,
            "filtered_context": filtered_context  # Optional: helps in debugging
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(port=5001, debug=True)