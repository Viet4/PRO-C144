import pandas as pd

df = pd.read_csv("articles.csv")
df = df[df["lang"] == "en"]
#print(df["lang"])

del df["id"]
df.reset_index(drop=True, inplace=True)

df.to_csv('articlesEN.csv', index=True)

df = pd.read_csv("articlesEN.csv")
df.rename( columns={'Unnamed: 0':'id'}, inplace=True )
df.to_csv("articlesEN.csv", index=False)