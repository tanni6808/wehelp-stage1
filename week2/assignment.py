# task 1
print('=== Task 1 ===')

def find_and_print(messages, current_station): 
 green_line = {
    'main': [
      "Songshan",
      "Nanjing Sanmin",
      "Taipei Arena",
      "Nanjing Fuxing",
      "Songjiang Nanjing",
      "Zhongshan",
      "Beimen",
      "Ximen",
      "Xiaonanmen",
      "Chiang Kai-Shek Memorial Hall",
      "Guting",
      "Taipower Building",
      "Gongguan",
      "Wanlong",
      "Jingmei",
      "Dapinglin",
      "Qizhang",
      "Xindian City Hall",
      "Xindian",
    ],
    'sub': ["Qizhang", "Xiaobitan"],
  }
 # find my current position {'line': , 'index': }
 if current_station in green_line["main"]:
  current_position = {'line': 'main', 'index': green_line['main'].index(current_station)}
 else:
  current_position = {'line': 'sub', 'index': green_line['sub'].index(current_station)}
 # for each message, create an dictionary {'name': , 'line': , 'index': }
 friend_positions=[]
 for name, message in messages.items():
  for line in green_line:
   for station in green_line[line]:
    if station in message:
     this_frined_position = {'name': name, 'line': line, 'index': green_line[line].index(station)}
     friend_positions.append(this_frined_position)
     break
 # calc. disctances
 for friend in friend_positions:
  if friend['line']==current_position['line']:
   friend['distance']=abs(friend['index']-current_position['index'])
  else:
   at_main=friend if friend['line']=='main' else current_position
   friend['distance']=abs(green_line["main"].index("Qizhang")-at_main['index'])+1
 # find nearest friends and print them out
 sorted_friend_positions=sorted(friend_positions, key=lambda d:d['distance'])
 nearest_friends = filter(lambda friend: friend['distance']==sorted_friend_positions[0]['distance'], sorted_friend_positions)
 nearest_friends_name_list =[]
 for friend in list(nearest_friends):
  nearest_friends_name_list.append(friend['name'])
 nearest_friends_name=', '.join(nearest_friends_name_list)
 print(nearest_friends_name)



messages={ 
 "Leslie":"I'm at home near Xiaobitan station.", 
 "Bob":"I'm at Ximen MRT station.", 
 "Mary":"I have a drink near Jingmei MRT station.", 
 "Copper":"I just saw a concert at Taipei Arena.", 
 "Vivian":"I'm at Xindian station waiting for you.",
} 

find_and_print(messages, "Wanlong") # print Mary 
find_and_print(messages, "Songshan") # print Copper 
find_and_print(messages, "Qizhang") # print Leslie 
find_and_print(messages, "Ximen") # print Bob 
find_and_print(messages, "Xindian City Hall") # print Vivian

########################################
# task 2
print('=== Task 2 ===')

# your code here, maybe 
def book(consultants, hour, duration, criteria): 
 # your code here 
 print('test')
consultants=[ 
 {"name":"John", "rate":4.5, "price":1000}, 
{"name":"Bob", "rate":3, "price":1200}, 
{"name":"Jenny", "rate":3.8, "price":800} 
] 
book(consultants, 15, 1, "price") # Jenny 
book(consultants, 11, 2, "price") # Jenny 
book(consultants, 10, 2, "price") # John 
book(consultants, 20, 2, "rate") # John 
book(consultants, 11, 1, "rate") # Bob 
book(consultants, 11, 2, "rate") # No Service 
book(consultants, 14, 3, "price") # John

########################################
# task 3
print('=== Task 3 ===')

def func(*data): 
 # your code here 
 middel_names = []
 unique = False
 for name in data:
  if len(name)==2 or len(name)==3:
   middel_names+=[name[1]]
  elif len(name) ==4 or len(name)==5:
   middel_names+=[name[2]]
 for i in range(len(middel_names)):
  if middel_names.count(middel_names[i])==1:
   print(data[i])
   unique = True
 if not unique:
  print('沒有')

func("彭大牆", "陳王明雅", "吳明") # print 彭大牆 
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花 
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有 
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安 

########################################
# task 4
print('=== Task 4 ===')

def get_number(index): 
 acc=0
 i=0
 while(i<index):
  if (i+1)%3==0:
   acc-=1
  else:
   acc+=4
  i+=1
 print(acc)

get_number(1) # print 4 
get_number(5) # print 15 
get_number(10) # print 25 
get_number(30) # print 70 
