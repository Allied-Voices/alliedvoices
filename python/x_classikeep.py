import csv
import nltk
from nltk.util import ngrams
import pandas as pd

def process_articles(df):
    #df = pd.read_excel(filename)
    #tokenize article
    #df['tokens'] = df.apply(lambda x: tokenize_article(x),axis=1)
    list_of_tokenizedarticles = []
    listofarticlestats = []
    
    for article_text in df['article_text'].to_list():
        #print("ARTTEXT", article_text)
        tokens = tokenize_article(article_text)
        #print("2-gram: ", extract_ngrams(tokens, 2))
        list_of_tokenizedarticles.append(tokens)
    for tokens in list_of_tokenizedarticles:
        article_stats = get_all_stats(tokens)
        listofarticlestats.append(article_stats)
    df = pd.DataFrame.from_dict(data=listofarticlestats)
    

    
    #print("DATAFRAME",df)
    return df

def process_titles(df):
    #df = pd.read_excel(filename)
    #tokenize article
    #df['tokens'] = df.apply(lambda x: tokenize_article(x),axis=1)
    list_of_tokenizedtitle = []
    listoftitlestats = []
    
    for title in df['Title'].to_list():
        #print("ARTTEXT", article_text)
        tokens = tokenize_article(title)
        #print("2-gram: ", extract_ngrams(tokens, 2))
        list_of_tokenizedtitle.append(tokens)
    for tokens in list_of_tokenizedtitle:
        article_stats = get_title_stats(tokens)
        listoftitlestats.append(article_stats)
    df = pd.DataFrame.from_dict(data=listoftitlestats)
    

    
    #print("DATAFRAME",df)
    return df

def tokenize_article(article_text):
    article = article_text.lower()
    tokens = nltk.word_tokenize(article)
    all_ngrams = []
    for num in [1,2,3,4,5,6,7,8]:
        ngram_list = extract_ngrams(tokens,num)
        all_ngrams += ngram_list
        #print(ngram_list)
        #print("ALL NGRAMS",all_ngrams)
    return all_ngrams

# Function to generate n-grams from sentences.
def extract_ngrams(tokens, num):
    n_grams = ngrams(tokens, num)
    return [ ' '.join(grams) for grams in n_grams]
 
#print("1-gram: ", extract_ngrams(data, 1))
#print("2-gram: ", extract_ngrams(data, 2))
#print("3-gram: ", extract_ngrams(data, 3))
#print("4-gram: ", extract_ngrams(data, 4))

def get_title_stats(tokens):
    
    dic = {}
    
    keep_dic = load_x_words('title_keep_words.txt')
    #print('kd',keep_dic)
    keep_dic_count = count_x_words(tokens, keep_dic)
    keep_score,keep_count = scoring(keep_dic_count)
    
    #keep_dom = len(keep_dic) - 7
    keep_dom = 10

    ratio = keep_count/keep_dom

    percentage = ratio * 100
    
    nokeep_dic = load_x_words('nokeep_words.txt')
    nokeep_dic_count = count_x_words(tokens, nokeep_dic)
    nokeep_score,nokeep_count = scoring(nokeep_dic_count)
    
    nokeep_dom = len(nokeep_dic)

    n_ratio = nokeep_count/nokeep_dom

    n_percentage = n_ratio * 100

    dic['title-k-l'] = percentage - n_percentage
    
    
    return dic

def get_all_stats(tokens):
   
    
    category_dic = {'community':['Asian','Arab','East Asian', 'Southeast Asian','Black','Latino','Jewish','Muslim', 'Sikh','LGBTQ']}
    threshold_dic = {'community':{1: ['Asian', 'Arab', 'East Asian', 'Southeast Asian','Latino','Jewish','Muslim', 'Sikh','LGBTQ'], 2: ['Black']}}
    
    dic = {}
    
    nynbh_dic = load_x_words('nynbh.txt')
    nynbh_dic_count = count_x_words(tokens, nynbh_dic)
    nynbhdf = score_ny_words(nynbh_dic_count)
    dic['nyc_nbh'] = nynbhdf

    nystnames_dic = load_x_words('nystnames2.txt')
    nystnames_dic_count = count_x_words(tokens, nystnames_dic)
    nystnamesdf = score_ny_words(nystnames_dic_count)
    dic['nyc_st'] = nystnamesdf

    nysubways_dic = load_x_words('nysubways.txt')
    nysubways_dic_count = count_x_words(tokens, nysubways_dic)
    nysubwaysdf = score_ny_words(nysubways_dic_count)
    dic['nysubway'] = nysubwaysdf

    
    keep_dic = load_x_words('keep2_words.txt')
    #print('kd',keep_dic)
    keep_dic_count = count_x_words(tokens, keep_dic)
    keep_score,keep_count = scoring(keep_dic_count)
    
    #keep_dom = len(keep_dic) - 15
    keep_dom = 10

    ratio = keep_count/keep_dom

    percentage = ratio * 100
    
    dic['keep'] = percentage
    
    nokeep_dic = load_x_words('nokeep_words.txt')
    nokeep_dic_count = count_x_words(tokens, nokeep_dic)
    nokeep_score,nokeep_count = scoring(nokeep_dic_count)
    
    nokeep_dom = len(nokeep_dic) - 2

    n_ratio = nokeep_count/nokeep_dom

    n_percentage = n_ratio * 100
    
    dic['nokeep'] = n_percentage

    dic['k-l'] = percentage - n_percentage

    for category,prefixes in category_dic.items():
        dic[category] = []

        for prefix in prefixes:
            x_word_dic = load_x_words(f'{prefix}_words.txt')
  
            dic_count = count_x_words(tokens, x_word_dic)
            #print("DIC COUNT",dic_count)
            
            x_score,count = scoring(dic_count)

            #dic[f'{prefix}_score'] = x_score
            #dic[f'{prefix}_unique'] = count
            
            for threshold, prefixes_in_threshold_dic in threshold_dic[category].items():
                if prefix in prefixes_in_threshold_dic:
                    prefix_threshold = threshold
            
            if x_score >= prefix_threshold:
                dic[category].append(prefix)

        dic[category] = ", ".join(dic[category])
    
    print(dic)
    return dic
    
def load_x_words(filename):
    """
    """
    with open(filename, encoding='utf8') as dic:
        x_indic = dic.read()
        #print("x_indic", x_indic)
    
    x_indic_dic = x_indic.split(',')
    
    for i in range(len(x_indic_dic)):
        x_indic_dic[i] = x_indic_dic[i].strip().lower()

    x_word_dic = {}

    # initializing dictionary to with x words as keys
    for word in x_indic_dic:
        x_word_dic[word] = 0
    #print('x_word_dic', x_word_dic)

    return x_word_dic

def score_ny_words(tokencount):
    l = []
    for k, v in tokencount.items():
        if tokencount[k] > 0:
            l.append(str(k))
    
    sofl = ", ".join(l)      
    return sofl

def count_x_words(tokens, x_word_bank):
    """Returns number of x occurences in article.
        
        params:
            article: a tokenized article (list of strings as words)
            x_word_bank: dictionary of x word strings as keys
                                with values as integers initialized at 0
    """
    #print('article\n', article)
    #print('phys_bank\n',x_word_bank)

    #for onearticle in list_of_tokenizedarticles
    for token in tokens:
        if token in x_word_bank:
            x_word_bank[token] += 1
        else:
            pass
    
    return x_word_bank

def scoring(tokencount):
    #count = unique word count
    #x_score = total # of words counted
    count = 0
    x_score = 0
    for k, v in tokencount.items():
        if tokencount[k] > 0:
            #print("\t" + k + ": " + str(v))
            count +=1
            x_score += v

    return x_score, count
    
def main(df_original):

    df = process_articles(df_original)
    title_df = process_titles(df_original)
    #all_stats_dataframe = get_all_stats(article1)
    publisher_df = pd.concat([df_original, df, title_df],axis=1)
    
    #publisher_df.to_excel(filename, index=False)
    #print('publisher\n', publisher_df)
    return publisher_df

#main()