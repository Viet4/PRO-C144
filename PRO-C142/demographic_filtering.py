import numpy as np
import pandas as pd

df = pd.read_csv("articlesEN.csv")

df = df.sort_values(by='totalEvents', ascending=True)
#print(df.head(20))

demographic_output = df[["url", "title", "text", "lang", "totalEvents"]].head(20).values.tolist()
#print(demographic_output)