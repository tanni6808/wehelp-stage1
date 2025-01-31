import urllib.request as req
import json
import csv
import bs4
import concurrent.futures
import time

# ##### TASK 1 #####
# src1='https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1'
# src2='https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2'

# with req.urlopen(src1) as response:
#     data1=json.load(response)
# with req.urlopen(src2) as response:
#     data2=json.load(response)
# spots_raw_list = data1["data"]["results"]
# spots_traffic = data2["data"]
# # print(spots_raw_list[0])
# # print(data2['data'][0])
# def find_district(spot):
#     serial_no=spot['SERIAL_NO']
#     full_address=''
#     for spot in spots_traffic:
#         if spot['SERIAL_NO']==serial_no:
#             full_address=spot['address']
#             break
#     return full_address[5:8]

# def find_first_image_url(spot):
#     filelist=spot['filelist']
#     i=filelist.find('https:', 1, -1)
#     return filelist[0:i]

# def find_spot(serial_no):
#     for spot in spots_raw_list:
#         if spot['SERIAL_NO']==serial_no:
#             return spot

# spots_list=[]
# for spot in spots_raw_list:
#     write_list=[spot['stitle'], find_district(spot), spot['longitude'], spot['latitude'], find_first_image_url(spot)]
#     spots_list.append(write_list)


# with open('spot.csv', 'w', newline='', encoding='utf-8') as csvfile:
#     writer=csv.writer(csvfile)
#     writer.writerows(spots_list)


# # a list of mrt stations
# mrt_station_list=list({spot['MRT']: spot for spot in spots_traffic})
# # a list to store nearby spots 
# mrt_list=[]
# for mrt_station in mrt_station_list:
#     mrt_list.append([mrt_station])

# for mrt in mrt_list:
#     for spot in spots_traffic:
#         if spot['MRT']==mrt[0]:
#             mrt.append(find_spot(spot['SERIAL_NO'])['stitle'])


# with open('mrt.csv', 'w', newline='', encoding='utf-8') as csvfile:
#     writer=csv.writer(csvfile)
#     writer.writerows(mrt_list)


##### TASK 2 #####
start=time.perf_counter()
def get_root_from_url(url):
    request=req.Request(url, headers={
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0', 'Cookie':'over18=1'
    })
    with req.urlopen(request) as response:
        data=response.read().decode('utf-8')
    return bs4.BeautifulSoup(data, 'html.parser')


def get_article_title_list(root):
    article_title_list=[]
    titles=root.find_all('div', class_='title')
    for title in titles:
        if title.a!=None:
            article_title_list.append([title.a.string, title.a['href']])
        else:
            # deleted_title=title.string.replace('\n', '').replace('\t', '')
            article_title_list.append([title.string, None])
    return article_title_list

def get_article_info_row(root, article_title):
    if article_title[1]!=None:
        nrec_span=root.find('a', string=article_title[0]).parent.parent.find('div', class_='nrec').span
        if nrec_span==None:
            nrec=0
        else:
            nrec=nrec_span.string
        title_link='https://www.ptt.cc'+ article_title[1]
        root=get_root_from_url(title_link)
        metalines=root.find_all('span', class_='article-meta-value')
        if metalines==[]:
            time=''
        else:
            time=metalines[-1].string
        return [article_title[0], nrec, time]
        
    else:
        nrec_span=root.find('div', string=article_title[0]).parent.find('div', class_='nrec').span
        if nrec_span==None:
            nrec=0
        else:
            nrec=nrec_span.string
        return [article_title[0].replace('\n', '').replace('\t', ''), nrec, '']


def get_article_info(first_page_url, pages):
    count=0
    url=first_page_url
    article_info_list=[]
    while count<pages:
        count+=1
        root=get_root_from_url(url)
        article_title_list = get_article_title_list(root)
        with concurrent.futures.ThreadPoolExecutor() as executor:
            results=[executor.submit(get_article_info_row, root, article_title) for article_title in article_title_list]
            for f in concurrent.futures.as_completed(results):
                article_info_list.append(f.result())
        # for article_title in article_title_list:
        #     # print(get_article_info_row(root, article_title))
        #     article_info_list.append(get_article_info_row(root, article_title))
        next_page_url='https://www.ptt.cc'+root.find('a', string='‹ 上頁')['href']
        url=next_page_url
    return article_info_list


test_url='https://www.ptt.cc/bbs/Lottery/index.html'

article_info_list = get_article_info(test_url, 3) 

with open('article.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer=csv.writer(csvfile)
    writer.writerows(article_info_list)

finish=time.perf_counter()
print(f'Finished in {round(finish-start,2)} seconds')

# 1p before: 7.29 seconds
# 1p after: 2.54 seconds

# 3p before: 49.26 seconds
# 3p after: 13.9 seconds