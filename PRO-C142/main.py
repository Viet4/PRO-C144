from flask import Flask, jsonify, request
from storage import all_articles, liked_articles, disliked_articles
from demographic_filtering import demographic_output
from content_filtering import get_recommendations
from itertools import groupby
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/get-articles")
def get_articles():
    data = {
        "url": all_articles[0][11],
        "title": all_articles[0][12],
        "text": all_articles[0][13],
        "lang": all_articles[0][14],
        "totalEvents": all_articles[0][15]
    }
    
    return jsonify({
        "data": data,
        "status": "success"
    })

@app.route("/liked-articles", methods=["POST"])
def like_articles():
    article = all_articles[0]
    all_articles.pop(0)
    liked_articles.append(article)
    
    return jsonify({
        "status": "success"
    }),201

@app.route("/disliked-articles", methods=["POST"])
def dislike_articles():
    article = all_articles[0]
    all_articles.pop(0)
    disliked_articles.append(article)
    
    return jsonify({
        "status": "success"
    }),201
    
@app.route("/popular-articles")
def popular_articles():
    article_data = []
    for article in demographic_output:
        data = {
            "url": article[0],
            "title": article[1],
            "text": article[2],
            "lang": article[3],
            "totalEvents": article[4]
        }
        article_data.append(data)

    return jsonify({
        "data": article_data,
        "status": "success"
    }),201

@app.route("/recommended-articles")
def recommended_articles():
    all_recommended = []
    for liked_article in liked_articles:
        output = get_recommendations(int(liked_article[4]))
        for data in output:
            all_recommended.append(data)

    all_recommended.sort()
    all_recommended = list(all_recommended for all_recommended,_ in groupby(all_recommended))

    article_data = []
    for recommended in all_recommended:
        data = {
            "url": recommended[0],
            "title": recommended[1],
            "text": recommended[2],
            "lang": recommended[3],
            "totalEvents": recommended[4]
        }
        article_data.append(data)

    return jsonify({
        "data": article_data,
        "status": "success"
    }), 201

if __name__ == '__main__':
    app.run(host="10.0.0.77")