# task 1
print('=== Task 1 ===')

def find_and_print(messages, current_station): 
 # your code here 
 print('test')

messages={ 
 "Leslie":"I'm at home near Xiaobitan station.", 
 "Bob":"I'm at Ximen MRT station.", 
 "Mary":"I have a drink near Jingmei MRT station.", 
 "Copper":"I just saw a concert at Taipei Arena.", 
 "Vivian":"I'm at Xindian station waiting for you." 
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
 print('test')
func("彭大牆", "陳王明雅", "吳明") # print 彭大牆 
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花 
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有 
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安 

########################################
# task 4
print('=== Task 4 ===')

def get_number(index): 
 # your code here 
 print('test')

get_number(1) # print 4 
get_number(5) # print 15 
get_number(10) # print 25 
get_number(30) # print 70 

########################################
# task 5
print('=== Task 5 ===')

def find(spaces, stat, n): 
 # your code here 
 print('test')
find([3, 1, 5, 4, 3, 2], [0, 1, 0, 1, 1, 1], 2) # print 5 
find([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4) # print -1 
find([4, 6, 5, 8], [0, 1, 1, 1], 4) # print 2