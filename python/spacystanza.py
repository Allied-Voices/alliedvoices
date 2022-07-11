import stanza
from spacy_stanza import StanzaLanguage
import os
import pandas as pd
from collections import defaultdict
from nltk.tokenize.treebank import TreebankWordDetokenizer


#stanza.download('en', processors='depparse',package='pos,lemma')

def run_spacystanza (text, title, spacystanzainstance):

    loc_track_dic = defaultdict(str)
    loc_track_dic['Title'] = title

    print("TEXT",text)
    text = text.rstrip()
    
    doc = spacystanzainstance(text)
    

    sents = doc.sents

    location_counter = 0
    gpe_counter = 0


    for i, sent in enumerate(sents):
        #print("TYPESENT",type(sent.text))
        for ent in sent.ents:
            
            if ent.label_ == "LOC":

                location_counter += 1
                
                word = ent.text
                #senttext = TreebankWordDetokenizer().detokenize(sent)
                loc_track_dic[f'L{location_counter}'] = [word]
                #print("WORD",word)
                #loc_track_dic[f'og sentence_{location_counter}'] = sent
                #print("SENT",sent.text)
                loc_track_dic[f'LS{location_counter}'] = [sent.text]
            
            if ent.label_ == "GPE":

                gpe_counter += 1
                word = ent.text
                loc_track_dic[f'G{gpe_counter}'] = [word]
                loc_track_dic[f'GS{gpe_counter}'] = [sent.text]
                
                
    #print("LOCTRACK",loc_track_dic)
    #for k, v in loc_track_dic.items():
        #print("K",k)
        #print("LENGTH", len(v))
    #loc_track_dic = dict(loc_track_dic)
    df = pd.DataFrame(loc_track_dic, index=[0])
    return df

def loop_articles(df):
    list_df = []

    snlp = stanza.Pipeline(lang='en', processors='tokenize, ner')
    nlp = StanzaLanguage(snlp)

    sentencizer = nlp.create_pipe("sentencizer")
    nlp.add_pipe(sentencizer)

    for i, row in df.iterrows():
        #print(row)
        loc_df = run_spacystanza(row['article_text'],row['Title'],nlp)
        list_df.append(loc_df)
    
    out_df = pd.concat(list_df)
    out_df = out_df.drop_duplicates()
    return out_df

if __name__ == "__main__":
    df = pd.read_excel('nov.xlsx').iloc[0:1]
    loc_info = loop_articles(df)
    loc_info.to_excel('loc_nov.xlsx',index=False)