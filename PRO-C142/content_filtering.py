from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

df = pd.read_csv("articlesEN.csv")
df = df[df['title'].notna()]
#print(df.head(10))

count = CountVectorizer(stop_words="english")
count_matrix = count.fit_transform(df["title"])
cosine_sim = cosine_similarity(count_matrix, count_matrix)  

df = df.reset_index()
indices = pd.Series(df.index, index = df["contentId"])

def get_recommendations(contentId):
    idx = indices[contentId]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x:x[1], reverse=True)
    sim_scores = sim_scores[1:11]

    articles_indices = [i[0] for i in sim_scores]
    return df[["url", "title", "text", "lang", "totalEvents"]].iloc[articles_indices].values.tolist()

#contentId = int(input("contentId: "))
#get_recommendations(contentId, cosine_sim)
# -4029704725707465084