const QUESTIONS = [
  {
    "id": 1,
    "category": "Number System",
    "difficulty": "Easy",
    "question": "What is the remainder when 257 is divided by 13?",
    "options": {
      "A": "8",
      "B": "9",
      "C": "10",
      "D": "11"
    },
    "answer": "C",
    "solution": "13 × 19 = 247. 257 − 247 = 10. Therefore, the remainder when 257 is divided by 13 is 10."
  },
  {
    "id": 2,
    "category": "Number System",
    "difficulty": "Easy",
    "question": "What is the remainder when 400 is divided by 10?",
    "options": {
      "A": "5",
      "B": "0",
      "C": "2",
      "D": "1"
    },
    "answer": "B",
    "solution": "400 ÷ 10 = 40 remainder 0, since 10 × 40 = 400 and 400 − 400 = 0. Therefore, the remainder is 0."
  },
  {
    "id": 3,
    "category": "Number System",
    "difficulty": "Medium",
    "question": "What is the remainder when 842 is divided by 18?",
    "options": {
      "A": "15",
      "B": "16",
      "C": "13",
      "D": "14"
    },
    "answer": "D",
    "solution": "842 ÷ 18 = 46 remainder 14, since 18 × 46 = 828 and 842 − 828 = 14. Therefore, the remainder is 14."
  },
  {
    "id": 4,
    "category": "Number System",
    "difficulty": "Medium",
    "question": "What is the remainder when 182 is divided by 7?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "5",
      "D": "0"
    },
    "answer": "D",
    "solution": "182 ÷ 7 = 26 remainder 0, since 7 × 26 = 182 and 182 − 182 = 0. Therefore, the remainder is 0."
  },
  {
    "id": 5,
    "category": "Number System",
    "difficulty": "Hard",
    "question": "What is the remainder when 667 is divided by 16?",
    "options": {
      "A": "10",
      "B": "13",
      "C": "12",
      "D": "11"
    },
    "answer": "D",
    "solution": "667 ÷ 16 = 41 remainder 11, since 16 × 41 = 656 and 667 − 656 = 11. Therefore, the remainder is 11."
  },
  {
    "id": 6,
    "category": "Number System",
    "difficulty": "Easy",
    "question": "What is the remainder when 883 is divided by 17?",
    "options": {
      "A": "1",
      "B": "17",
      "C": "16",
      "D": "15"
    },
    "answer": "C",
    "solution": "883 ÷ 17 = 51 remainder 16, since 17 × 51 = 867 and 883 − 867 = 16. Therefore, the remainder is 16."
  },
  {
    "id": 7,
    "category": "Number System",
    "difficulty": "Easy",
    "question": "What is the remainder when 753 is divided by 11?",
    "options": {
      "A": "6",
      "B": "4",
      "C": "7",
      "D": "5"
    },
    "answer": "D",
    "solution": "753 ÷ 11 = 68 remainder 5, since 11 × 68 = 748 and 753 − 748 = 5. Therefore, the remainder is 5."
  },
  {
    "id": 8,
    "category": "Number System",
    "difficulty": "Medium",
    "question": "What is the remainder when 498 is divided by 11?",
    "options": {
      "A": "4",
      "B": "5",
      "C": "3",
      "D": "2"
    },
    "answer": "C",
    "solution": "498 ÷ 11 = 45 remainder 3, since 11 × 45 = 495 and 498 − 495 = 3. Therefore, the remainder is 3."
  },
  {
    "id": 9,
    "category": "Percentages",
    "difficulty": "Easy",
    "question": "What is 6% of 220?",
    "options": {
      "A": "10.56",
      "B": "15.84",
      "C": "13.2",
      "D": "19.2"
    },
    "answer": "C",
    "solution": "6% of 220 = (6/100) × 220 = 13.2."
  },
  {
    "id": 10,
    "category": "Percentages",
    "difficulty": "Easy",
    "question": "What is 38% of 480?",
    "options": {
      "A": "220.4",
      "B": "218.88",
      "C": "182.4",
      "D": "145.92"
    },
    "answer": "C",
    "solution": "38% of 480 = (38/100) × 480 = 182.4."
  },
  {
    "id": 11,
    "category": "Percentages",
    "difficulty": "Medium",
    "question": "What is 8% of 750?",
    "options": {
      "A": "48.0",
      "B": "72.0",
      "C": "60",
      "D": "68"
    },
    "answer": "C",
    "solution": "8% of 750 = (8/100) × 750 = 60."
  },
  {
    "id": 12,
    "category": "Percentages",
    "difficulty": "Medium",
    "question": "What is 38% of 900?",
    "options": {
      "A": "410.4",
      "B": "342",
      "C": "380",
      "D": "273.6"
    },
    "answer": "B",
    "solution": "38% of 900 = (38/100) × 900 = 342."
  },
  {
    "id": 13,
    "category": "Percentages",
    "difficulty": "Hard",
    "question": "What is 6% of 1000?",
    "options": {
      "A": "72.0",
      "B": "66",
      "C": "48.0",
      "D": "60"
    },
    "answer": "D",
    "solution": "6% of 1000 = (6/100) × 1000 = 60."
  },
  {
    "id": 14,
    "category": "Percentages",
    "difficulty": "Easy",
    "question": "What is 6% of 400?",
    "options": {
      "A": "19.2",
      "B": "30",
      "C": "24",
      "D": "28.8"
    },
    "answer": "C",
    "solution": "6% of 400 = (6/100) × 400 = 24."
  },
  {
    "id": 15,
    "category": "Percentages",
    "difficulty": "Easy",
    "question": "What is 28% of 350?",
    "options": {
      "A": "126",
      "B": "117.6",
      "C": "98",
      "D": "78.4"
    },
    "answer": "C",
    "solution": "28% of 350 = (28/100) × 350 = 98."
  },
  {
    "id": 16,
    "category": "Percentages",
    "difficulty": "Medium",
    "question": "What is 14% of 480?",
    "options": {
      "A": "80.64",
      "B": "67.2",
      "C": "81.2",
      "D": "53.76"
    },
    "answer": "B",
    "solution": "14% of 480 = (14/100) × 480 = 67.2."
  },
  {
    "id": 17,
    "category": "Profit & Loss",
    "difficulty": "Easy",
    "question": "A shopkeeper buys an article for ₹1000 and sells it at a gain of 30%. What is the selling price?",
    "options": {
      "A": "1170.0",
      "B": "1390.0",
      "C": "1300.0",
      "D": "1430.0"
    },
    "answer": "C",
    "solution": "Selling price = CP × (100 + 30)/100 = 1000 × (130)/100 = ₹1300.0."
  },
  {
    "id": 18,
    "category": "Profit & Loss",
    "difficulty": "Easy",
    "question": "A shopkeeper buys an article for ₹750 and sells it at a loss of 15%. What is the selling price?",
    "options": {
      "A": "637.5",
      "B": "603.75",
      "C": "573.75",
      "D": "701.25"
    },
    "answer": "A",
    "solution": "Selling price = CP × (100 - 15)/100 = 750 × (85)/100 = ₹637.5."
  },
  {
    "id": 19,
    "category": "Profit & Loss",
    "difficulty": "Medium",
    "question": "A shopkeeper buys an article for ₹200 and sells it at a gain of 12%. What is the selling price?",
    "options": {
      "A": "224.0",
      "B": "231.2",
      "C": "246.4",
      "D": "201.6"
    },
    "answer": "A",
    "solution": "Selling price = CP × (100 + 12)/100 = 200 × (112)/100 = ₹224.0."
  },
  {
    "id": 20,
    "category": "Profit & Loss",
    "difficulty": "Medium",
    "question": "A shopkeeper buys an article for ₹250 and sells it at a loss of 12%. What is the selling price?",
    "options": {
      "A": "211.0",
      "B": "242.0",
      "C": "220.0",
      "D": "198.0"
    },
    "answer": "C",
    "solution": "Selling price = CP × (100 - 12)/100 = 250 × (88)/100 = ₹220.0."
  },
  {
    "id": 21,
    "category": "Profit & Loss",
    "difficulty": "Hard",
    "question": "A shopkeeper buys an article for ₹750 and sells it at a gain of 30%. What is the selling price?",
    "options": {
      "A": "877.5",
      "B": "975.0",
      "C": "1042.5",
      "D": "1072.5"
    },
    "answer": "B",
    "solution": "Selling price = CP × (100 + 30)/100 = 750 × (130)/100 = ₹975.0."
  },
  {
    "id": 22,
    "category": "Profit & Loss",
    "difficulty": "Easy",
    "question": "A shopkeeper buys an article for ₹400 and sells it at a loss of 30%. What is the selling price?",
    "options": {
      "A": "280.0",
      "B": "308.0",
      "C": "244.0",
      "D": "252.0"
    },
    "answer": "A",
    "solution": "Selling price = CP × (100 - 30)/100 = 400 × (70)/100 = ₹280.0."
  },
  {
    "id": 23,
    "category": "Profit & Loss",
    "difficulty": "Easy",
    "question": "A shopkeeper buys an article for ₹1000 and sells it at a gain of 20%. What is the selling price?",
    "options": {
      "A": "1080.0",
      "B": "1260.0",
      "C": "1200.0",
      "D": "1320.0"
    },
    "answer": "C",
    "solution": "Selling price = CP × (100 + 20)/100 = 1000 × (120)/100 = ₹1200.0."
  },
  {
    "id": 24,
    "category": "Discount",
    "difficulty": "Easy",
    "question": "A shirt marked at ₹600 is sold after a discount of 10%. Find the selling price.",
    "options": {
      "A": "594.0",
      "B": "486.0",
      "C": "168.0",
      "D": "540.0"
    },
    "answer": "D",
    "solution": "Selling price = Marked Price × (100 − 10)/100 = 600 × 90/100 = ₹540.0."
  },
  {
    "id": 25,
    "category": "Discount",
    "difficulty": "Easy",
    "question": "A shirt marked at ₹2000 is sold after a discount of 30%. Find the selling price.",
    "options": {
      "A": "880.0",
      "B": "1260.0",
      "C": "1540.0",
      "D": "1400.0"
    },
    "answer": "D",
    "solution": "Selling price = Marked Price × (100 − 30)/100 = 2000 × 70/100 = ₹1400.0."
  },
  {
    "id": 26,
    "category": "Discount",
    "difficulty": "Medium",
    "question": "A shirt marked at ₹2500 is sold after a discount of 30%. Find the selling price.",
    "options": {
      "A": "1925.0",
      "B": "1750.0",
      "C": "1100.0",
      "D": "1575.0"
    },
    "answer": "B",
    "solution": "Selling price = Marked Price × (100 − 30)/100 = 2500 × 70/100 = ₹1750.0."
  },
  {
    "id": 27,
    "category": "Discount",
    "difficulty": "Medium",
    "question": "A shirt marked at ₹600 is sold after a discount of 30%. Find the selling price.",
    "options": {
      "A": "420.0",
      "B": "462.0",
      "C": "264.0",
      "D": "378.0"
    },
    "answer": "A",
    "solution": "Selling price = Marked Price × (100 − 30)/100 = 600 × 70/100 = ₹420.0."
  },
  {
    "id": 28,
    "category": "Discount",
    "difficulty": "Hard",
    "question": "A shirt marked at ₹600 is sold after a discount of 20%. Find the selling price.",
    "options": {
      "A": "432.0",
      "B": "528.0",
      "C": "480.0",
      "D": "216.0"
    },
    "answer": "C",
    "solution": "Selling price = Marked Price × (100 − 20)/100 = 600 × 80/100 = ₹480.0."
  },
  {
    "id": 29,
    "category": "Discount",
    "difficulty": "Easy",
    "question": "A shirt marked at ₹500 is sold after a discount of 20%. Find the selling price.",
    "options": {
      "A": "180.0",
      "B": "400.0",
      "C": "360.0",
      "D": "440.0"
    },
    "answer": "B",
    "solution": "Selling price = Marked Price × (100 − 20)/100 = 500 × 80/100 = ₹400.0."
  },
  {
    "id": 30,
    "category": "Ratio & Proportion",
    "difficulty": "Easy",
    "question": "Two numbers are in the ratio 6:12. If their difference is 66, find the two numbers.",
    "options": {
      "A": "60 and 126",
      "B": "72 and 144",
      "C": "66 and 132",
      "D": "72 and 138"
    },
    "answer": "C",
    "solution": "Let the numbers be 6x and 12x. Difference = (12-6)x = 6x = 66, so x = 11. The numbers are 6×11=66 and 12×11=132."
  },
  {
    "id": 31,
    "category": "Ratio & Proportion",
    "difficulty": "Easy",
    "question": "Two numbers are in the ratio 4:5. If their difference is 12, find the two numbers.",
    "options": {
      "A": "52 and 65",
      "B": "48 and 60",
      "C": "49 and 61",
      "D": "47 and 59"
    },
    "answer": "B",
    "solution": "Let the numbers be 4x and 5x. Difference = (5-4)x = 1x = 12, so x = 12. The numbers are 4×12=48 and 5×12=60."
  },
  {
    "id": 32,
    "category": "Ratio & Proportion",
    "difficulty": "Medium",
    "question": "Two numbers are in the ratio 3:9. If their difference is 90, find the two numbers.",
    "options": {
      "A": "51 and 141",
      "B": "48 and 144",
      "C": "45 and 135",
      "D": "39 and 129"
    },
    "answer": "C",
    "solution": "Let the numbers be 3x and 9x. Difference = (9-3)x = 6x = 90, so x = 15. The numbers are 3×15=45 and 9×15=135."
  },
  {
    "id": 33,
    "category": "Ratio & Proportion",
    "difficulty": "Medium",
    "question": "Two numbers are in the ratio 5:10. If their difference is 20, find the two numbers.",
    "options": {
      "A": "25 and 50",
      "B": "25 and 45",
      "C": "15 and 35",
      "D": "20 and 40"
    },
    "answer": "D",
    "solution": "Let the numbers be 5x and 10x. Difference = (10-5)x = 5x = 20, so x = 4. The numbers are 5×4=20 and 10×4=40."
  },
  {
    "id": 34,
    "category": "Ratio & Proportion",
    "difficulty": "Hard",
    "question": "Two numbers are in the ratio 3:12. If their difference is 135, find the two numbers.",
    "options": {
      "A": "36 and 171",
      "B": "48 and 192",
      "C": "45 and 180",
      "D": "54 and 189"
    },
    "answer": "C",
    "solution": "Let the numbers be 3x and 12x. Difference = (12-3)x = 9x = 135, so x = 15. The numbers are 3×15=45 and 12×15=180."
  },
  {
    "id": 35,
    "category": "Ratio & Proportion",
    "difficulty": "Easy",
    "question": "Two numbers are in the ratio 4:9. If their difference is 55, find the two numbers.",
    "options": {
      "A": "49 and 104",
      "B": "39 and 94",
      "C": "44 and 99",
      "D": "48 and 108"
    },
    "answer": "C",
    "solution": "Let the numbers be 4x and 9x. Difference = (9-4)x = 5x = 55, so x = 11. The numbers are 4×11=44 and 9×11=99."
  },
  {
    "id": 36,
    "category": "Ratio & Proportion",
    "difficulty": "Easy",
    "question": "Two numbers are in the ratio 6:10. If their difference is 52, find the two numbers.",
    "options": {
      "A": "78 and 130",
      "B": "84 and 140",
      "C": "82 and 134",
      "D": "74 and 126"
    },
    "answer": "A",
    "solution": "Let the numbers be 6x and 10x. Difference = (10-6)x = 4x = 52, so x = 13. The numbers are 6×13=78 and 10×13=130."
  },
  {
    "id": 37,
    "category": "Average",
    "difficulty": "Easy",
    "question": "Find the average of the following numbers: 41, 38, 18, 53.",
    "options": {
      "A": "39.5",
      "B": "42.5",
      "C": "35.5",
      "D": "37.5"
    },
    "answer": "D",
    "solution": "Sum = 41 + 38 + 18 + 53 = 150. Average = 150/4 = 37.5."
  },
  {
    "id": 38,
    "category": "Average",
    "difficulty": "Easy",
    "question": "Find the average of the following numbers: 38, 10, 19, 90, 17, 39, 18, 14.",
    "options": {
      "A": "32.62",
      "B": "35.62",
      "C": "30.62",
      "D": "28.62"
    },
    "answer": "C",
    "solution": "Sum = 38 + 10 + 19 + 90 + 17 + 39 + 18 + 14 = 245. Average = 245/8 = 30.62."
  },
  {
    "id": 39,
    "category": "Ratio & Proportion",
    "difficulty": "Medium",
    "question": "Two numbers are in the ratio 5:8. If their difference is 39, find the two numbers.",
    "options": {
      "A": "56 and 91",
      "B": "70 and 112",
      "C": "65 and 104",
      "D": "60 and 96"
    },
    "answer": "C",
    "solution": "Let the numbers be 5x and 8x. Difference = (8−5)x = 3x = 39, so x = 13. The numbers are 5×13 = 65 and 8×13 = 104."
  },
  {
    "id": 40,
    "category": "Average",
    "difficulty": "Medium",
    "question": "Find the average of the following numbers: 34, 22, 22, 94, 65, 55, 64.",
    "options": {
      "A": "48.86",
      "B": "50.86",
      "C": "52.86",
      "D": "55.86"
    },
    "answer": "B",
    "solution": "Sum = 34 + 22 + 22 + 94 + 65 + 55 + 64 = 356. Average = 356/7 = 50.86."
  },
  {
    "id": 41,
    "category": "Average",
    "difficulty": "Hard",
    "question": "Find the average of the following numbers: 17, 61, 53, 23.",
    "options": {
      "A": "43.5",
      "B": "36.5",
      "C": "38.5",
      "D": "40.5"
    },
    "answer": "C",
    "solution": "Sum = 17 + 61 + 53 + 23 = 154. Average = 154/4 = 38.5."
  },
  {
    "id": 42,
    "category": "Average",
    "difficulty": "Easy",
    "question": "Find the average of the following numbers: 67, 27, 64, 33, 45, 69, 41, 19.",
    "options": {
      "A": "47.62",
      "B": "45.62",
      "C": "43.62",
      "D": "50.62"
    },
    "answer": "B",
    "solution": "Sum = 67 + 27 + 64 + 33 + 45 + 69 + 41 + 19 = 365. Average = 365/8 = 45.62."
  },
  {
    "id": 43,
    "category": "Simple Interest",
    "difficulty": "Easy",
    "question": "Find the simple interest on ₹2000 at 12% per annum for 2 years.",
    "options": {
      "A": "576.0",
      "B": "384.0",
      "C": "500.0",
      "D": "480"
    },
    "answer": "D",
    "solution": "SI = (P × R × T)/100 = (2000 × 12 × 2)/100 = ₹480."
  },
  {
    "id": 44,
    "category": "Simple Interest",
    "difficulty": "Easy",
    "question": "Find the simple interest on ₹5000 at 10% per annum for 5 years.",
    "options": {
      "A": "2000.0",
      "B": "2500",
      "C": "2550.0",
      "D": "3000.0"
    },
    "answer": "B",
    "solution": "SI = (P × R × T)/100 = (5000 × 10 × 5)/100 = ₹2500."
  },
  {
    "id": 45,
    "category": "Simple Interest",
    "difficulty": "Medium",
    "question": "Find the simple interest on ₹3000 at 10% per annum for 2 years.",
    "options": {
      "A": "600",
      "B": "480.0",
      "C": "720.0",
      "D": "630.0"
    },
    "answer": "A",
    "solution": "SI = (P × R × T)/100 = (3000 × 10 × 2)/100 = ₹600."
  },
  {
    "id": 46,
    "category": "Simple Interest",
    "difficulty": "Medium",
    "question": "A sum of money amounts to ₹6,600 in 2 years at 10% per annum simple interest. Find the principal.",
    "options": {
      "A": "₹5,000",
      "B": "₹5,500",
      "C": "₹6,000",
      "D": "₹5,800"
    },
    "answer": "B",
    "solution": "Amount = Principal × (1 + (R×T)/100) = P × (1 + 20/100) = 1.2P. So 1.2P = 6,600, giving P = 6,600/1.2 = ₹5,500."
  },
  {
    "id": 47,
    "category": "Simple Interest",
    "difficulty": "Hard",
    "question": "Find the simple interest on ₹3000 at 5% per annum for 2 years.",
    "options": {
      "A": "360.0",
      "B": "330.0",
      "C": "300",
      "D": "240.0"
    },
    "answer": "C",
    "solution": "SI = (P × R × T)/100 = (3000 × 5 × 2)/100 = ₹300."
  },
  {
    "id": 48,
    "category": "Simple Interest",
    "difficulty": "Easy",
    "question": "Find the simple interest on ₹6000 at 10% per annum for 3 years.",
    "options": {
      "A": "2160.0",
      "B": "1860.0",
      "C": "1440.0",
      "D": "1800"
    },
    "answer": "D",
    "solution": "SI = (P × R × T)/100 = (6000 × 10 × 3)/100 = ₹1800."
  },
  {
    "id": 49,
    "category": "Compound Interest",
    "difficulty": "Easy",
    "question": "Find the compound interest on ₹2000 at 5% per annum for 2 years, compounded annually.",
    "options": {
      "A": "174.25",
      "B": "205.0",
      "C": "200.0",
      "D": "235.75"
    },
    "answer": "B",
    "solution": "Amount = P(1+R/100)^T = 2000(1+5/100)^2 = ₹2205.0. CI = Amount − Principal = 2205.0 − 2000 = ₹205.0."
  },
  {
    "id": 50,
    "category": "Compound Interest",
    "difficulty": "Easy",
    "question": "Find the compound interest on ₹8000 at 5% per annum for 2 years, compounded annually.",
    "options": {
      "A": "800.0",
      "B": "697.0",
      "C": "943.0",
      "D": "820.0"
    },
    "answer": "D",
    "solution": "Amount = P(1+R/100)^T = 8000(1+5/100)^2 = ₹8820.0. CI = Amount − Principal = 8820.0 − 8000 = ₹820.0."
  },
  {
    "id": 51,
    "category": "Compound Interest",
    "difficulty": "Medium",
    "question": "Find the compound interest on ₹4000 at 5% per annum for 3 years, compounded annually.",
    "options": {
      "A": "630.5",
      "B": "535.92",
      "C": "600.0",
      "D": "725.07"
    },
    "answer": "A",
    "solution": "Amount = P(1+R/100)^T = 4000(1+5/100)^3 = ₹4630.5. CI = Amount − Principal = 4630.5 − 4000 = ₹630.5."
  },
  {
    "id": 52,
    "category": "Compound Interest",
    "difficulty": "Medium",
    "question": "Find the compound interest on ₹2000 at 20% per annum for 3 years, compounded annually.",
    "options": {
      "A": "1237.6",
      "B": "1456.0",
      "C": "1674.4",
      "D": "1200.0"
    },
    "answer": "B",
    "solution": "Amount = P(1+R/100)^T = 2000(1+20/100)^3 = ₹3456.0. CI = Amount − Principal = 3456.0 − 2000 = ₹1456.0."
  },
{
    "id": 53,
    "category": "Compound Interest",
    "difficulty": "Hard",
    "question": "Find the compound interest on ₹1000 at 10% per annum for 2 years, compounded annually.",
    "options": {
      "A": "241.5",
      "B": "200.0",
      "C": "178.5",
      "D": "210.0"
    },
    "answer": "D",
    "solution": "Amount = P(1+R/100)^T = 1000(1+10/100)^2 = ₹1210.0. CI = Amount − Principal = 1210.0 − 1000 = ₹210.0."
  },
  {
    "id": 54,
    "category": "Compound Interest",
    "difficulty": "Easy",
    "question": "Find the compound interest on ₹8000 at 10% per annum for 2 years, compounded annually.",
    "options": {
      "A": "1932.0",
      "B": "1600.0",
      "C": "1680.0",
      "D": "1428.0"
    },
    "answer": "C",
    "solution": "Amount = P(1+R/100)^T = 8000(1+10/100)^2 = ₹9680.0. CI = Amount − Principal = 9680.0 − 8000 = ₹1680.0."
  },
  {
    "id": 55,
    "category": "Time & Work",
    "difficulty": "Easy",
    "question": "A can complete a piece of work in 15 days and B can complete it in 20 days. In how many days will they complete the work together?",
    "options": {
      "A": "8.57",
      "B": "6.86",
      "C": "17.5",
      "D": "10.28"
    },
    "answer": "A",
    "solution": "A's 1 day work = 1/15, B's 1 day work = 1/20. Together per day = 1/15+1/20. Time taken = (15×20)/(15+20) = 8.57 days."
  },
  {
    "id": 56,
    "category": "Time & Work",
    "difficulty": "Easy",
    "question": "A can complete a piece of work in 20 days and B can complete it in 40 days. In how many days will they complete the work together?",
    "options": {
      "A": "30.0",
      "B": "16.0",
      "C": "10.66",
      "D": "13.33"
    },
    "answer": "D",
    "solution": "A's 1 day work = 1/20, B's 1 day work = 1/40. Together per day = 1/20+1/40. Time taken = (20×40)/(20+40) = 13.33 days."
  },
  {
    "id": 57,
    "category": "Time & Work",
    "difficulty": "Medium",
    "question": "A can complete a piece of work in 24 days and B can complete it in 15 days. In how many days will they complete the work together?",
    "options": {
      "A": "7.38",
      "B": "9.23",
      "C": "19.5",
      "D": "11.08"
    },
    "answer": "B",
    "solution": "A's 1 day work = 1/24, B's 1 day work = 1/15. Together per day = 1/24+1/15. Time taken = (24×15)/(24+15) = 9.23 days."
  },
  {
    "id": 58,
    "category": "Time & Work",
    "difficulty": "Medium",
    "question": "A can complete a piece of work in 10 days and B can complete it in 36 days. In how many days will they complete the work together?",
    "options": {
      "A": "7.83",
      "B": "6.26",
      "C": "23.0",
      "D": "9.4"
    },
    "answer": "A",
    "solution": "A's 1 day work = 1/10, B's 1 day work = 1/36. Together per day = 1/10+1/36. Time taken = (10×36)/(10+36) = 7.83 days."
  },
  {
    "id": 59,
    "category": "Time & Work",
    "difficulty": "Hard",
    "question": "A can complete a piece of work in 20 days and B can complete it in 18 days. In how many days will they complete the work together?",
    "options": {
      "A": "19.0",
      "B": "11.36",
      "C": "9.47",
      "D": "7.58"
    },
    "answer": "C",
    "solution": "A's 1 day work = 1/20, B's 1 day work = 1/18. Together per day = 1/20+1/18. Time taken = (20×18)/(20+18) = 9.47 days."
  },
  {
    "id": 60,
    "category": "Time & Work",
    "difficulty": "Easy",
    "question": "A can complete a piece of work in 20 days and B can complete it in 24 days. In how many days will they complete the work together?",
    "options": {
      "A": "13.09",
      "B": "22.0",
      "C": "10.91",
      "D": "8.73"
    },
    "answer": "C",
    "solution": "A's 1 day work = 1/20, B's 1 day work = 1/24. Together per day = 1/20+1/24. Time taken = (20×24)/(20+24) = 10.91 days."
  },
  {
    "id": 61,
    "category": "Time & Work",
    "difficulty": "Easy",
    "question": "A can complete a piece of work in 24 days and B can complete it in 40 days. In how many days will they complete the work together?",
    "options": {
      "A": "18.0",
      "B": "32.0",
      "C": "15.0",
      "D": "12.0"
    },
    "answer": "C",
    "solution": "A's 1 day work = 1/24, B's 1 day work = 1/40. Together per day = 1/24+1/40. Time taken = (24×40)/(24+40) = 15.0 days."
  },
  {
    "id": 62,
    "category": "Pipes & Cisterns",
    "difficulty": "Easy",
    "question": "Pipe A can fill a tank in 10 hours and pipe B can fill it in 12 hours. If both pipes are opened together, how long will they take to fill the tank?",
    "options": {
      "A": "11.0",
      "B": "6.54",
      "C": "5.45",
      "D": "4.36"
    },
    "answer": "C",
    "solution": "Combined rate = 1/10+1/12 per hour. Time = (10×12)/(10+12) = 5.45 hours."
  },
  {
    "id": 63,
    "category": "Pipes & Cisterns",
    "difficulty": "Easy",
    "question": "Pipe A can fill a tank in 15 hours and pipe B can fill it in 18 hours. If both pipes are opened together, how long will they take to fill the tank?",
    "options": {
      "A": "9.82",
      "B": "6.54",
      "C": "16.5",
      "D": "8.18"
    },
    "answer": "D",
    "solution": "Combined rate = 1/15+1/18 per hour. Time = (15×18)/(15+18) = 8.18 hours."
  },
  {
    "id": 64,
    "category": "Pipes & Cisterns",
    "difficulty": "Medium",
    "question": "Pipe A can fill a tank in 6 hours and pipe B can fill it in 22 hours. If both pipes are opened together, how long will they take to fill the tank?",
    "options": {
      "A": "3.77",
      "B": "14.0",
      "C": "5.65",
      "D": "4.71"
    },
    "answer": "D",
    "solution": "Combined rate = 1/6+1/22 per hour. Time = (6×22)/(6+22) = 4.71 hours."
  },
  {
    "id": 65,
    "category": "Pipes & Cisterns",
    "difficulty": "Medium",
    "question": "Pipe A can fill a tank in 4 hours and pipe B can fill it in 15 hours. If both pipes are opened together, how long will they take to fill the tank?",
    "options": {
      "A": "9.5",
      "B": "3.79",
      "C": "3.16",
      "D": "2.53"
    },
    "answer": "C",
    "solution": "Combined rate = 1/4+1/15 per hour. Time = (4×15)/(4+15) = 3.16 hours."
  },
  {
    "id": 66,
    "category": "Pipes & Cisterns",
    "difficulty": "Hard",
    "question": "Pipe A can fill a tank in 8 hours and pipe B can fill it in 14 hours. If both pipes are opened together, how long will they take to fill the tank?",
    "options": {
      "A": "11.0",
      "B": "4.07",
      "C": "6.11",
      "D": "5.09"
    },
    "answer": "D",
    "solution": "Combined rate = 1/8+1/14 per hour. Time = (8×14)/(8+14) = 5.09 hours."
  },
  {
    "id": 67,
    "category": "Time, Speed & Distance",
    "difficulty": "Easy",
    "question": "A train travels at a speed of 72 km/h for 3 hours. How much distance does it cover?",
    "options": {
      "A": "360",
      "B": "144",
      "C": "216",
      "D": "288"
    },
    "answer": "C",
    "solution": "Distance = Speed × Time = 72 × 3 = 216 km."
  },
  {
    "id": 68,
    "category": "Time, Speed & Distance",
    "difficulty": "Easy",
    "question": "A train travels at a speed of 60 km/h for 2 hours. How much distance does it cover?",
    "options": {
      "A": "120",
      "B": "240",
      "C": "60",
      "D": "180"
    },
    "answer": "A",
    "solution": "Distance = Speed × Time = 60 × 2 = 120 km."
  },
  {
    "id": 69,
    "category": "Time, Speed & Distance",
    "difficulty": "Medium",
    "question": "A train travels at a speed of 90 km/h for 5 hours. How much distance does it cover?",
    "options": {
      "A": "360",
      "B": "450",
      "C": "630",
      "D": "540"
    },
    "answer": "B",
    "solution": "Distance = Speed × Time = 90 × 5 = 450 km."
  },
  {
    "id": 70,
    "category": "Time, Speed & Distance",
    "difficulty": "Medium",
    "question": "A train travels at a speed of 90 km/h for 2 hours. How much distance does it cover?",
    "options": {
      "A": "90",
      "B": "270",
      "C": "180",
      "D": "360"
    },
    "answer": "C",
    "solution": "Distance = Speed × Time = 90 × 2 = 180 km."
  },
  {
    "id": 71,
    "category": "Time, Speed & Distance",
    "difficulty": "Hard",
    "question": "A train travels at a speed of 45 km/h for 3 hours. How much distance does it cover?",
    "options": {
      "A": "135",
      "B": "90",
      "C": "180",
      "D": "225"
    },
    "answer": "A",
    "solution": "Distance = Speed × Time = 45 × 3 = 135 km."
  },
  {
    "id": 72,
    "category": "Time, Speed & Distance",
    "difficulty": "Easy",
    "question": "A train travels at a speed of 90 km/h for 3 hours. How much distance does it cover?",
    "options": {
      "A": "450",
      "B": "180",
      "C": "270",
      "D": "360"
    },
    "answer": "C",
    "solution": "Distance = Speed × Time = 90 × 3 = 270 km."
  },
  {
    "id": 73,
    "category": "Time, Speed & Distance",
    "difficulty": "Easy",
    "question": "A train travels at a speed of 60 km/h for 4 hours. How much distance does it cover?",
    "options": {
      "A": "360",
      "B": "300",
      "C": "240",
      "D": "180"
    },
    "answer": "C",
    "solution": "Distance = Speed × Time = 60 × 4 = 240 km."
  },
  {
    "id": 74,
    "category": "Boats & Streams",
    "difficulty": "Easy",
    "question": "The speed of a boat in still water is 15 km/h and the speed of the stream is 5 km/h. Find the speed of the boat downstream.",
    "options": {
      "A": "10",
      "B": "15",
      "C": "20",
      "D": "25"
    },
    "answer": "C",
    "solution": "Downstream speed = Boat speed + Stream speed = 15 + 5 = 20 km/h."
  },
  {
    "id": 75,
    "category": "Boats & Streams",
    "difficulty": "Easy",
    "question": "The speed of a boat in still water is 15 km/h and the speed of the stream is 3 km/h. Find the speed of the boat downstream.",
    "options": {
      "A": "12",
      "B": "15",
      "C": "18",
      "D": "21"
    },
    "answer": "C",
    "solution": "Downstream speed = Boat speed + Stream speed = 15 + 3 = 18 km/h."
  },
  {
    "id": 76,
    "category": "Algebra",
    "difficulty": "Easy",
    "question": "If 3x + 15 = 105, find the value of x.",
    "options": {
      "A": "25",
      "B": "30",
      "C": "35",
      "D": "40"
    },
    "answer": "B",
    "solution": "3x + 15 = 105 ⟹ 3x = 90 ⟹ x = 30."
  },
  {
    "id": 77,
    "category": "Boats & Streams",
    "difficulty": "Medium",
    "question": "The speed of a boat in still water is 18 km/h and the speed of the stream is 2 km/h. Find the speed of the boat downstream.",
    "options": {
      "A": "16",
      "B": "20",
      "C": "22",
      "D": "18"
    },
    "answer": "B",
    "solution": "Downstream speed = Boat speed + Stream speed = 18 + 2 = 20 km/h."
  },
  {
    "id": 78,
    "category": "Boats & Streams",
    "difficulty": "Hard",
    "question": "The speed of a boat in still water is 15 km/h and the speed of the stream is 2 km/h. Find the speed of the boat downstream.",
    "options": {
      "A": "13",
      "B": "19",
      "C": "17",
      "D": "15"
    },
    "answer": "C",
    "solution": "Downstream speed = Boat speed + Stream speed = 15 + 2 = 17 km/h."
  },
  {
    "id": 79,
    "category": "Problems on Ages",
    "difficulty": "Easy",
    "question": "A father is 3 times as old as his son. If the son's age is 13 years, what is the father's age?",
    "options": {
      "A": "16",
      "B": "44",
      "C": "34",
      "D": "39"
    },
    "answer": "D",
    "solution": "Father's age = 3 × Son's age = 3 × 13 = 39 years."
  },
  {
    "id": 80,
    "category": "Problems on Ages",
    "difficulty": "Easy",
    "question": "A father is 3 times as old as his son. If the son's age is 17 years, what is the father's age?",
    "options": {
      "A": "20",
      "B": "56",
      "C": "46",
      "D": "51"
    },
    "answer": "D",
    "solution": "Father's age = 3 × Son's age = 3 × 17 = 51 years."
  },
  {
    "id": 81,
    "category": "Problems on Ages",
    "difficulty": "Medium",
    "question": "A father is 3 times as old as his son. If the son's age is 16 years, what is the father's age?",
    "options": {
      "A": "48",
      "B": "43",
      "C": "53",
      "D": "19"
    },
    "answer": "A",
    "solution": "Father's age = 3 × Son's age = 3 × 16 = 48 years."
  },
  {
    "id": 82,
    "category": "Problems on Ages",
    "difficulty": "Medium",
    "question": "A father is 3 times as old as his son. If the son's age is 19 years, what is the father's age?",
    "options": {
      "A": "52",
      "B": "22",
      "C": "57",
      "D": "62"
    },
    "answer": "C",
    "solution": "Father's age = 3 × Son's age = 3 × 19 = 57 years."
  },
  {
    "id": 83,
    "category": "Problems on Ages",
    "difficulty": "Hard",
    "question": "A father is 3 times as old as his son. If the son's age is 18 years, what is the father's age?",
    "options": {
      "A": "54",
      "B": "21",
      "C": "49",
      "D": "59"
    },
    "answer": "A",
    "solution": "Father's age = 3 × Son's age = 3 × 18 = 54 years."
  },
  {
    "id": 84,
    "category": "Problems on Ages",
    "difficulty": "Easy",
    "question": "A father is 4 times as old as his son. If the son's age is 14 years, what is the father's age?",
    "options": {
      "A": "18",
      "B": "51",
      "C": "61",
      "D": "56"
    },
    "answer": "D",
    "solution": "Father's age = 4 × Son's age = 4 × 14 = 56 years."
  },
  {
    "id": 85,
    "category": "Mixtures & Allegations",
    "difficulty": "Easy",
    "question": "A shopkeeper mixes 15 kg of rice costing ₹50/kg with 20 kg of rice costing ₹90/kg. Find the average price per kg of the mixture.",
    "options": {
      "A": "67.86",
      "B": "72.86",
      "C": "77.86",
      "D": "70.0"
    },
    "answer": "B",
    "solution": "Total cost = (15×50) + (20×90) = ₹2550. Total quantity = 15+20 = 35 kg. Average price = 2550/35 = ₹72.86 per kg."
  },
  {
    "id": 86,
    "category": "Coding-Decoding",
    "difficulty": "Easy",
    "question": "If each letter is assigned a numerical value equal to its position in the English alphabet (A=1, B=2, C=3, ... Z=26), what is the sum of the values of the letters in the word CODE?",
    "options": {
      "A": "24",
      "B": "27",
      "C": "29",
      "D": "31"
    },
    "answer": "B",
    "solution": "C(3) + O(15) + D(4) + E(5) = 3+15+4+5 = 27. Therefore, the sum is 27."
  },
  {
    "id": 87,
    "category": "Mixtures & Allegations",
    "difficulty": "Medium",
    "question": "A shopkeeper mixes 20 kg of rice costing ₹30/kg with 15 kg of rice costing ₹70/kg. Find the average price per kg of the mixture.",
    "options": {
      "A": "52.14",
      "B": "42.14",
      "C": "50.0",
      "D": "47.14"
    },
    "answer": "D",
    "solution": "Total cost = (20×30) + (15×70) = ₹1650. Total quantity = 20+15 = 35 kg. Average price = 1650/35 = ₹47.14 per kg."
  },
  {
    "id": 88,
    "category": "Mixtures & Allegations",
    "difficulty": "Medium",
    "question": "A shopkeeper mixes 25 kg of rice costing ₹20/kg with 25 kg of rice costing ₹90/kg. Find the average price per kg of the mixture.",
    "options": {
      "A": "55.0",
      "B": "55.0*",
      "C": "50.0",
      "D": "60.0"
    },
    "answer": "A",
    "solution": "Total cost = (25×20) + (25×90) = ₹2750. Total quantity = 25+25 = 50 kg. Average price = 2750/50 = ₹55.0 per kg."
  },
  {
    "id": 89,
    "category": "Logical Reasoning",
    "difficulty": "Easy",
    "question": "If yesterday was Monday, what day will it be the day after tomorrow?",
    "options": {
      "A": "Wednesday",
      "B": "Thursday",
      "C": "Friday",
      "D": "Tuesday"
    },
    "answer": "B",
    "solution": "If yesterday was Monday, today is Tuesday. Tomorrow is Wednesday, and the day after tomorrow is Thursday."
  },
  {
    "id": 90,
    "category": "Partnership",
    "difficulty": "Easy",
    "question": "A and B start a business investing ₹3000 and ₹4000 respectively. If the total profit is ₹5000, find A's share of the profit (profit divided in the ratio of investment).",
    "options": {
      "A": "2192.86",
      "B": "2500.0",
      "C": "2092.86",
      "D": "2142.86"
    },
    "answer": "D",
    "solution": "Ratio of investment A:B = 3000:4000 = 3:4. A's share = Profit × A's capital/Total capital = 5000 × 3000/7000 = ₹2142.86."
  },
  {
    "id": 91,
    "category": "Partnership",
    "difficulty": "Easy",
    "question": "A and B start a business investing ₹2000 and ₹8000 respectively. If the total profit is ₹2000, find A's share of the profit (profit divided in the ratio of investment).",
    "options": {
      "A": "400.0",
      "B": "450.0",
      "C": "350.0",
      "D": "1000.0"
    },
    "answer": "A",
    "solution": "Ratio of investment A:B = 2000:8000 = 1:4. A's share = Profit × A's capital/Total capital = 2000 × 2000/10000 = ₹400.0."
  },
  {
    "id": 92,
    "category": "Partnership",
    "difficulty": "Medium",
    "question": "A and B start a business investing ₹5000 and ₹8000 respectively. If the total profit is ₹5000, find A's share of the profit (profit divided in the ratio of investment).",
    "options": {
      "A": "1923.08",
      "B": "2500.0",
      "C": "1873.08",
      "D": "1973.08"
    },
    "answer": "A",
    "solution": "Ratio of investment A:B = 5000:8000 = 5:8. A's share = Profit × A's capital/Total capital = 5000 × 5000/13000 = ₹1923.08."
  },
  {
    "id": 93,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A survey of 800 employees at a company found that 200 of them work in the IT department. What percentage of employees work in IT?",
    "options": {
      "A": "20%",
      "B": "25%",
      "C": "30%",
      "D": "35%"
    },
    "answer": "B",
    "solution": "Percentage = (Number in IT / Total employees) × 100 = (200/800) × 100 = 25%."
  },
  {
    "id": 94,
    "category": "Partnership",
    "difficulty": "Hard",
    "question": "A and B start a business investing ₹3000 and ₹6000 respectively. If the total profit is ₹5000, find A's share of the profit (profit divided in the ratio of investment).",
    "options": {
      "A": "2500.0",
      "B": "1716.67",
      "C": "1616.67",
      "D": "1666.67"
    },
    "answer": "D",
    "solution": "Ratio of investment A:B = 3000:6000 = 1:2. A's share = Profit × A's capital/Total capital = 5000 × 3000/9000 = ₹1666.67."
  },
  {
    "id": 95,
    "category": "Probability",
    "difficulty": "Easy",
    "question": "A card is drawn at random from a well-shuffled deck of 52 playing cards. What is the probability that the card drawn is a face card?",
    "options": {
      "A": "3/13",
      "B": "2/13",
      "C": "4/13",
      "D": "3/16"
    },
    "answer": "A",
    "solution": "Number of favorable outcomes = 12. Total outcomes = 52. Probability = 12/52 = 3/13 (in lowest terms)."
  },
  {
    "id": 96,
    "category": "Probability",
    "difficulty": "Easy",
    "question": "A card is drawn at random from a well-shuffled deck of 52 playing cards. What is the probability that the card drawn is a heart?",
    "options": {
      "A": "2/4",
      "B": "1/7",
      "C": "1/4*",
      "D": "1/4"
    },
    "answer": "D",
    "solution": "Number of favorable outcomes = 13. Total outcomes = 52. Probability = 13/52 = 1/4 (in lowest terms)."
  },
  {
    "id": 97,
    "category": "Probability",
    "difficulty": "Medium",
    "question": "A card is drawn at random from a well-shuffled deck of 52 playing cards. What is the probability that the card drawn is a jack?",
    "options": {
      "A": "1/13*",
      "B": "1/13",
      "C": "1/16",
      "D": "2/13"
    },
    "answer": "B",
    "solution": "Number of favorable outcomes = 4. Total outcomes = 52. Probability = 4/52 = 1/13 (in lowest terms)."
  },
  {
    "id": 98,
    "category": "Probability",
    "difficulty": "Medium",
    "question": "A card is drawn at random from a well-shuffled deck of 52 playing cards. What is the probability that the card drawn is a queen?",
    "options": {
      "A": "1/13",
      "B": "1/16",
      "C": "2/13",
      "D": "1/13*"
    },
    "answer": "A",
    "solution": "Number of favorable outcomes = 4. Total outcomes = 52. Probability = 4/52 = 1/13 (in lowest terms)."
  },
  {
    "id": 99,
    "category": "Probability",
    "difficulty": "Hard",
    "question": "A card is drawn at random from a well-shuffled deck of 52 playing cards. What is the probability that the card drawn is a spade?",
    "options": {
      "A": "2/4",
      "B": "1/7",
      "C": "1/4",
      "D": "1/4*"
    },
    "answer": "C",
    "solution": "Number of favorable outcomes = 13. Total outcomes = 52. Probability = 13/52 = 1/4 (in lowest terms)."
  },
  {
    "id": 100,
    "category": "Probability",
    "difficulty": "Easy",
    "question": "A card is drawn at random from a well-shuffled deck of 52 playing cards. What is the probability that the card drawn is a diamond?",
    "options": {
      "A": "1/4*",
      "B": "2/4",
      "C": "1/7",
      "D": "1/4"
    },
    "answer": "D",
    "solution": "Number of favorable outcomes = 13. Total outcomes = 52. Probability = 13/52 = 1/4 (in lowest terms)."
  },
  {
    "id": 101,
    "category": "Permutation & Combination",
    "difficulty": "Easy",
    "question": "In how many ways can a committee of 4 people be selected from 5 people (order does not matter)?",
    "options": {
      "A": "5",
      "B": "10",
      "C": "9",
      "D": "1"
    },
    "answer": "A",
    "solution": "Number of ways = C(5,4) = 5!/(4!×(5-4)!) = 5."
  },
  {
    "id": 102,
    "category": "Permutation & Combination",
    "difficulty": "Easy",
    "question": "In how many ways can 3 letters be arranged out of 12 distinct letters (order matters)?",
    "options": {
      "A": "1320",
      "B": "2640",
      "C": "1323",
      "D": "1317"
    },
    "answer": "A",
    "solution": "Number of arrangements = P(12,3) = 12!/(12-3)! = 1320."
  },
  {
    "id": 103,
    "category": "Permutation & Combination",
    "difficulty": "Medium",
    "question": "In how many ways can 4 letters be arranged out of 11 distinct letters (order matters)?",
    "options": {
      "A": "7924",
      "B": "7920",
      "C": "7916",
      "D": "15840"
    },
    "answer": "B",
    "solution": "Number of arrangements = P(11,4) = 11!/(11-4)! = 7920."
  },
  {
    "id": 104,
    "category": "Permutation & Combination",
    "difficulty": "Medium",
    "question": "In how many ways can a committee of 2 people be selected from 7 people (order does not matter)?",
    "options": {
      "A": "23",
      "B": "21",
      "C": "19",
      "D": "42"
    },
    "answer": "B",
    "solution": "Number of ways = C(7,2) = 7!/(2!×(7-2)!) = 21."
  },
  {
    "id": 105,
    "category": "Permutation & Combination",
    "difficulty": "Hard",
    "question": "In how many ways can 3 letters be arranged out of 11 distinct letters (order matters)?",
    "options": {
      "A": "993",
      "B": "987",
      "C": "990",
      "D": "1980"
    },
    "answer": "C",
    "solution": "Number of arrangements = P(11,3) = 11!/(11-3)! = 990."
  },
  {
    "id": 106,
    "category": "Permutation & Combination",
    "difficulty": "Easy",
    "question": "In how many ways can a committee of 4 people be selected from 11 people (order does not matter)?",
    "options": {
      "A": "330",
      "B": "326",
      "C": "660",
      "D": "334"
    },
    "answer": "A",
    "solution": "Number of ways = C(11,4) = 11!/(4!×(11-4)!) = 330."
  },
  {
    "id": 107,
    "category": "Algebra",
    "difficulty": "Easy",
    "question": "If 5x + 22 = 152, find the value of x.",
    "options": {
      "A": "21",
      "B": "26",
      "C": "31",
      "D": "36"
    },
    "answer": "B",
    "solution": "5x + 22 = 152 ⟹ 5x = 130 ⟹ x = 130/5 = 26."
  },
  {
    "id": 108,
    "category": "Algebra",
    "difficulty": "Easy",
    "question": "If 2x + 52 = 122, find the value of x.",
    "options": {
      "A": "30",
      "B": "45",
      "C": "40",
      "D": "35"
    },
    "answer": "D",
    "solution": "2x + 52 = 122 ⟹ 2x = 70 ⟹ x = 70/2 = 35."
  },
  {
    "id": 109,
    "category": "Algebra",
    "difficulty": "Medium",
    "question": "If 2x + 53 = 71, find the value of x.",
    "options": {
      "A": "14",
      "B": "4",
      "C": "19",
      "D": "9"
    },
    "answer": "D",
    "solution": "2x + 53 = 71 ⟹ 2x = 18 ⟹ x = 18/2 = 9."
  },
  {
    "id": 110,
    "category": "Algebra",
    "difficulty": "Medium",
    "question": "If 6x + 14 = 50, find the value of x.",
    "options": {
      "A": "1",
      "B": "16",
      "C": "6",
      "D": "11"
    },
    "answer": "C",
    "solution": "6x + 14 = 50 ⟹ 6x = 36 ⟹ x = 36/6 = 6."
  },
  {
    "id": 111,
    "category": "Algebra",
    "difficulty": "Hard",
    "question": "If 6x + 18 = 90, find the value of x.",
    "options": {
      "A": "12",
      "B": "17",
      "C": "7",
      "D": "22"
    },
    "answer": "A",
    "solution": "6x + 18 = 90 ⟹ 6x = 72 ⟹ x = 72/6 = 12."
  },
  {
    "id": 112,
    "category": "Algebra",
    "difficulty": "Easy",
    "question": "If 3x + 43 = 127, find the value of x.",
    "options": {
      "A": "23",
      "B": "33",
      "C": "38",
      "D": "28"
    },
    "answer": "D",
    "solution": "3x + 43 = 127 ⟹ 3x = 84 ⟹ x = 84/3 = 28."
  },
  {
    "id": 113,
    "category": "Algebra",
    "difficulty": "Easy",
    "question": "If 6x + 6 = 72, find the value of x.",
    "options": {
      "A": "11",
      "B": "16",
      "C": "21",
      "D": "6"
    },
    "answer": "A",
    "solution": "6x + 6 = 72 ⟹ 6x = 66 ⟹ x = 66/6 = 11."
  },
  {
    "id": 114,
    "category": "Mensuration",
    "difficulty": "Easy",
    "question": "Find the area of a triangle with base 17 cm and height 7 cm.",
    "options": {
      "A": "71.4",
      "B": "119",
      "C": "47.6",
      "D": "59.5"
    },
    "answer": "D",
    "solution": "Area = (1/2) × base × height = (1/2) × 17 × 7 = 59.5 cm²."
  },
  {
    "id": 115,
    "category": "Mensuration",
    "difficulty": "Easy",
    "question": "Find the area of a rectangle with length 17 cm and breadth 7 cm.",
    "options": {
      "A": "48",
      "B": "109",
      "C": "129",
      "D": "119"
    },
    "answer": "D",
    "solution": "Area = length × breadth = 17 × 7 = 119 cm²."
  },
  {
    "id": 116,
    "category": "Mensuration",
    "difficulty": "Medium",
    "question": "Find the area of a circle with radius 7 cm (use π = 22/7).",
    "options": {
      "A": "44.0",
      "B": "169.4",
      "C": "154.0",
      "D": "138.6"
    },
    "answer": "C",
    "solution": "Area = πr² = (22/7) × 7² = 154.0 cm²."
  },
  {
    "id": 117,
    "category": "Mensuration",
    "difficulty": "Medium",
    "question": "Find the area of a triangle with base 7 cm and height 10 cm.",
    "options": {
      "A": "35.0",
      "B": "42.0",
      "C": "70",
      "D": "28.0"
    },
    "answer": "A",
    "solution": "Area = (1/2) × base × height = (1/2) × 7 × 10 = 35.0 cm²."
  },
  {
    "id": 118,
    "category": "Mensuration",
    "difficulty": "Hard",
    "question": "Find the area of a square with side 18 cm.",
    "options": {
      "A": "324",
      "B": "314",
      "C": "334",
      "D": "72"
    },
    "answer": "A",
    "solution": "Area = side² = 18² = 324 cm²."
  },
  {
    "id": 119,
    "category": "Mensuration",
    "difficulty": "Easy",
    "question": "Find the area of a triangle with base 13 cm and height 10 cm.",
    "options": {
      "A": "130",
      "B": "65.0",
      "C": "78.0",
      "D": "52.0"
    },
    "answer": "B",
    "solution": "Area = (1/2) × base × height = (1/2) × 13 × 10 = 65.0 cm²."
  },
  {
    "id": 120,
    "category": "Mensuration",
    "difficulty": "Easy",
    "question": "Find the area of a rectangle with length 16 cm and breadth 18 cm.",
    "options": {
      "A": "288",
      "B": "278",
      "C": "68",
      "D": "298"
    },
    "answer": "A",
    "solution": "Area = length × breadth = 16 × 18 = 288 cm²."
  },
  {
    "id": 121,
    "category": "Number Series",
    "difficulty": "Easy",
    "question": "Find the next number in the series: 25, 36, 49, 64, 81, ?",
    "options": {
      "A": "102",
      "B": "101",
      "C": "100",
      "D": "99"
    },
    "answer": "C",
    "solution": "The sequence is squares of consecutive numbers starting 5: 25, 36, 49, 64, 81, ... Next term = 10² = 100."
  },
  {
    "id": 122,
    "category": "Number Series",
    "difficulty": "Easy",
    "question": "Find the next number in the series: 4, 12, 36, 108, 324, ?",
    "options": {
      "A": "972",
      "B": "973",
      "C": "974",
      "D": "971"
    },
    "answer": "A",
    "solution": "The pattern multiplies by 3 each time: 4, 12, 36, 108, 324, ... Next term = 324 × 3 = 972."
  },
  {
    "id": 123,
    "category": "Number Series",
    "difficulty": "Medium",
    "question": "Find the next number in the series: 10, 15, 20, 25, 30, ?",
    "options": {
      "A": "34",
      "B": "36",
      "C": "37",
      "D": "35"
    },
    "answer": "D",
    "solution": "The pattern adds 5 each time: 10, 15, 20, 25, 30, ... Next term = 30 + 5 = 35."
  },
  {
    "id": 124,
    "category": "Number Series",
    "difficulty": "Medium",
    "question": "Find the next number in the series: 10, 13, 25, 28, 40, ?",
    "options": {
      "A": "43",
      "B": "44",
      "C": "42",
      "D": "45"
    },
    "answer": "A",
    "solution": "The sequence alternately adds 3 and 12: 10, 13, 25, 28, 40, ... Next term = 43."
  },
  {
    "id": 125,
    "category": "Number Series",
    "difficulty": "Hard",
    "question": "Find the next number in the series: 2, 4, 13, 15, 24, ?",
    "options": {
      "A": "25",
      "B": "26",
      "C": "28",
      "D": "27"
    },
    "answer": "B",
    "solution": "The sequence alternately adds 2 and 9: 2, 4, 13, 15, 24, ... Next term = 26."
  },
  {
    "id": 126,
    "category": "Alphabet Series",
    "difficulty": "Easy",
    "question": "Find the next letter in the series: K, N, Q, T, ?",
    "options": {
      "A": "W",
      "B": "Y",
      "C": "X",
      "D": "V"
    },
    "answer": "A",
    "solution": "Each letter is 3 positions after the previous one in the alphabet: K, N, Q, T, ... Next letter after T (+3) = W."
  },
  {
    "id": 127,
    "category": "Alphabet Series",
    "difficulty": "Easy",
    "question": "Find the next letter in the series: L, O, R, U, ?",
    "options": {
      "A": "X",
      "B": "Z",
      "C": "Y",
      "D": "W"
    },
    "answer": "A",
    "solution": "Each letter is 3 positions after the previous one in the alphabet: L, O, R, U, ... Next letter after U (+3) = X."
  },
  {
    "id": 128,
    "category": "Alphabet Series",
    "difficulty": "Medium",
    "question": "Find the next letter in the series: E, H, K, N, ?",
    "options": {
      "A": "R",
      "B": "S",
      "C": "Q",
      "D": "P"
    },
    "answer": "C",
    "solution": "Each letter is 3 positions after the previous one in the alphabet: E, H, K, N, ... Next letter after N (+3) = Q."
  },
  {
    "id": 129,
    "category": "Alphabet Series",
    "difficulty": "Medium",
    "question": "Find the next letter in the series: D, H, L, P, ?",
    "options": {
      "A": "U",
      "B": "V",
      "C": "T",
      "D": "S"
    },
    "answer": "C",
    "solution": "Each letter is 4 positions after the previous one in the alphabet: D, H, L, P, ... Next letter after P (+4) = T."
  },
  {
    "id": 130,
    "category": "Alphabet Series",
    "difficulty": "Hard",
    "question": "Find the next letter in the series: G, I, K, M, ?",
    "options": {
      "A": "O",
      "B": "N",
      "C": "P",
      "D": "Q"
    },
    "answer": "A",
    "solution": "Each letter is 2 positions after the previous one in the alphabet: G, I, K, M, ... Next letter after M (+2) = O."
  },
  {
    "id": 131,
    "category": "Coding-Decoding",
    "difficulty": "Easy",
    "question": "If each letter is assigned a numerical value equal to its position in the English alphabet (A=1, B=2, ... Z=26), what is the sum of the values of the letters in the word BOOK?",
    "options": {
      "A": "41",
      "B": "43",
      "C": "47",
      "D": "45"
    },
    "answer": "B",
    "solution": "B(2) + O(15) + O(15) + K(11) = 43. Therefore, the sum is 43."
  },
  {
    "id": 132,
    "category": "Coding-Decoding",
    "difficulty": "Easy",
    "question": "If each letter is assigned a numerical value equal to its position in the English alphabet (A=1, B=2, ... Z=26), what is the sum of the values of the letters in the word TREE?",
    "options": {
      "A": "46",
      "B": "48",
      "C": "52",
      "D": "50"
    },
    "answer": "B",
    "solution": "T(20) + R(18) + E(5) + E(5) = 48. Therefore, the sum is 48."
  },
  {
    "id": 133,
    "category": "Coding-Decoding",
    "difficulty": "Medium",
    "question": "If each letter is assigned a numerical value equal to its position in the English alphabet (A=1, B=2, ... Z=26), what is the sum of the values of the letters in the word WIND?",
    "options": {
      "A": "48",
      "B": "50",
      "C": "54",
      "D": "52"
    },
    "answer": "B",
    "solution": "W(23) + I(9) + N(14) + D(4) = 50. Therefore, the sum is 50."
  },
  {
    "id": 134,
    "category": "Coding-Decoding",
    "difficulty": "Medium",
    "question": "If each letter is assigned a numerical value equal to its position in the English alphabet (A=1, B=2, ... Z=26), what is the sum of the values of the letters in the word MIND?",
    "options": {
      "A": "42",
      "B": "40",
      "C": "44",
      "D": "38"
    },
    "answer": "B",
    "solution": "M(13) + I(9) + N(14) + D(4) = 40. Therefore, the sum is 40."
  },
  {
    "id": 135,
    "category": "Coding-Decoding",
    "difficulty": "Hard",
    "question": "If each letter is assigned a numerical value equal to its position in the English alphabet (A=1, B=2, ... Z=26), what is the sum of the values of the letters in the word LEAF?",
    "options": {
      "A": "26",
      "B": "22",
      "C": "24",
      "D": "28"
    },
    "answer": "C",
    "solution": "L(12) + E(5) + A(1) + F(6) = 24. Therefore, the sum is 24."
  },
  {
    "id": 136,
    "category": "Blood Relations",
    "difficulty": "Easy",
    "question": "Pointing to a man, a woman said, 'He is the son of my mother's only daughter.' How is the man related to the woman?",
    "options": {
      "A": "Son",
      "B": "Father",
      "C": "Brother",
      "D": "Nephew"
    },
    "answer": "A",
    "solution": "The woman's mother's only daughter is the woman herself. So the man is the son of the woman, meaning the man is her son."
  },
  {
    "id": 137,
    "category": "Blood Relations",
    "difficulty": "Easy",
    "question": "A is B's father. C is B's sister. D is C's mother. How is D related to A?",
    "options": {
      "A": "Daughter",
      "B": "Wife",
      "C": "Sister",
      "D": "Mother"
    },
    "answer": "B",
    "solution": "D is C's mother and C is B's sister, so D is B's mother too. Since A is B's father, D (B's mother) is A's wife."
  },
  {
    "id": 138,
    "category": "Blood Relations",
    "difficulty": "Medium",
    "question": "Ravi introduces Meena as the daughter of the only son of his grandfather. How is Meena related to Ravi?",
    "options": {
      "A": "Aunt",
      "B": "Daughter",
      "C": "Cousin",
      "D": "Sister"
    },
    "answer": "D",
    "solution": "The only son of Ravi's grandfather is Ravi's father. So Meena, the daughter of Ravi's father, is Ravi's sister."
  },
  {
    "id": 139,
    "category": "Blood Relations",
    "difficulty": "Medium",
    "question": "P is the brother of Q. Q is the sister of R. R is the father of S. How is P related to S?",
    "options": {
      "A": "Brother",
      "B": "Father",
      "C": "Grandfather",
      "D": "Uncle"
    },
    "answer": "D",
    "solution": "R is S's father, and P is R's sibling (brother). So P is S's uncle."
  },
  {
    "id": 140,
    "category": "Blood Relations",
    "difficulty": "Hard",
    "question": "Looking at a photograph, Anil said, 'She is the daughter of my grandfather's only child.' Who is the woman in the photo to Anil?",
    "options": {
      "A": "Mother",
      "B": "Cousin",
      "C": "Sister",
      "D": "Aunt"
    },
    "answer": "C",
    "solution": "Anil's grandfather's only child must be Anil's own parent. So the woman, the daughter of Anil's parent, is Anil's sister."
  },
  {
    "id": 141,
    "category": "Direction Sense",
    "difficulty": "Easy",
    "question": "A man walks 6 km towards west, then turns and walks 5 km towards south. In which direction is he now from his starting point (approximately)?",
    "options": {
      "A": "North-West",
      "B": "South-East",
      "C": "Due West",
      "D": "South-West"
    },
    "answer": "D",
    "solution": "Walking west then south (a 90° turn) places the man in the South-West direction from the starting point."
  },
  {
    "id": 142,
    "category": "Direction Sense",
    "difficulty": "Easy",
    "question": "A man walks 12 km towards north, then turns and walks 9 km towards east. In which direction is he now from his starting point (approximately)?",
    "options": {
      "A": "North-East",
      "B": "South-East",
      "C": "North-West",
      "D": "Due North"
    },
    "answer": "A",
    "solution": "Walking north then east (a 90° turn) places the man in the North-East direction from the starting point."
  },
  {
    "id": 143,
    "category": "Direction Sense",
    "difficulty": "Medium",
    "question": "A man walks 8 km towards west, then turns and walks 9 km towards south. In which direction is he now from his starting point (approximately)?",
    "options": {
      "A": "North-West",
      "B": "Due West",
      "C": "South-East",
      "D": "South-West"
    },
    "answer": "D",
    "solution": "Walking west then south (a 90° turn) places the man in the South-West direction from the starting point."
  },
  {
    "id": 144,
    "category": "Direction Sense",
    "difficulty": "Medium",
    "question": "A man walks 7 km towards west, then turns and walks 6 km towards south. In which direction is he now from his starting point (approximately)?",
    "options": {
      "A": "North-West",
      "B": "South-East",
      "C": "Due West",
      "D": "South-West"
    },
    "answer": "D",
    "solution": "Walking west then south (a 90° turn) places the man in the South-West direction from the starting point."
  },
  {
    "id": 145,
    "category": "Direction Sense",
    "difficulty": "Hard",
    "question": "A man walks 6 km towards north, then turns and walks 4 km towards east. In which direction is he now from his starting point (approximately)?",
    "options": {
      "A": "Due North",
      "B": "South-East",
      "C": "North-West",
      "D": "North-East"
    },
    "answer": "D",
    "solution": "Walking north then east (a 90° turn) places the man in the North-East direction from the starting point."
  },
  {
    "id": 146,
    "category": "Analogy",
    "difficulty": "Easy",
    "question": "Doctor is to Hospital as Teacher is to ?",
    "options": {
      "A": "Judge",
      "B": "School",
      "C": "Farmer",
      "D": "Nurse"
    },
    "answer": "B",
    "solution": "Just as Doctor relates to Hospital, Teacher relates to School by the same kind of relationship."
  },
  {
    "id": 147,
    "category": "Analogy",
    "difficulty": "Easy",
    "question": "Pen is to Write as Knife is to ?",
    "options": {
      "A": "Cut",
      "B": "Paper",
      "C": "Book",
      "D": "Scissors"
    },
    "answer": "A",
    "solution": "Just as Pen relates to Write, Knife relates to Cut by the same kind of relationship."
  },
  {
    "id": 148,
    "category": "Analogy",
    "difficulty": "Medium",
    "question": "Fish is to Water as Bird is to ?",
    "options": {
      "A": "Tree",
      "B": "Nest",
      "C": "Air",
      "D": "Sky"
    },
    "answer": "C",
    "solution": "Just as Fish relates to Water, Bird relates to Air by the same kind of relationship."
  },
  {
    "id": 149,
    "category": "Analogy",
    "difficulty": "Medium",
    "question": "Book is to Author as Painting is to ?",
    "options": {
      "A": "Canvas",
      "B": "Painter",
      "C": "Frame",
      "D": "Brush"
    },
    "answer": "B",
    "solution": "Just as Book relates to Author, Painting relates to Painter by the same kind of relationship."
  },
  {
    "id": 150,
    "category": "Analogy",
    "difficulty": "Hard",
    "question": "Puppy is to Dog as Kitten is to ?",
    "options": {
      "A": "Cub",
      "B": "Calf",
      "C": "Cat",
      "D": "Foal"
    },
    "answer": "C",
    "solution": "Just as Puppy relates to Dog, Kitten relates to Cat by the same kind of relationship."
  },
  {
    "id": 151,
    "category": "Classification",
    "difficulty": "Easy",
    "question": "Which of the following does not belong to the group?",
    "options": {
      "A": "Mango",
      "B": "Carrot",
      "C": "Banana",
      "D": "Apple"
    },
    "answer": "B",
    "solution": "Apple, Mango and Banana are fruits, while Carrot is a vegetable."
  },
  {
    "id": 152,
    "category": "Classification",
    "difficulty": "Easy",
    "question": "Which of the following does not belong to the group?",
    "options": {
      "A": "Triangle",
      "B": "Square",
      "C": "Circle",
      "D": "Wood"
    },
    "answer": "D",
    "solution": "Triangle, Square and Circle are geometric shapes, while Wood is a material."
  },
  {
    "id": 153,
    "category": "Classification",
    "difficulty": "Medium",
    "question": "Which of the following does not belong to the group?",
    "options": {
      "A": "Kerala",
      "B": "Delhi",
      "C": "Chennai",
      "D": "Mumbai"
    },
    "answer": "A",
    "solution": "Delhi, Mumbai and Chennai are cities, while Kerala is a state."
  },
  {
    "id": 154,
    "category": "Classification",
    "difficulty": "Medium",
    "question": "Which of the following does not belong to the group?",
    "options": {
      "A": "Violin",
      "B": "Guitar",
      "C": "Chair",
      "D": "Flute"
    },
    "answer": "C",
    "solution": "Guitar, Violin and Flute are musical instruments, while Chair is furniture."
  },
  {
    "id": 155,
    "category": "Classification",
    "difficulty": "Hard",
    "question": "Which of the following does not belong to the group?",
    "options": {
      "A": "Mango",
      "B": "Rose",
      "C": "Jasmine",
      "D": "Lotus"
    },
    "answer": "A",
    "solution": "Rose, Lotus and Jasmine are flowers, while Mango is a fruit."
  },
  {
    "id": 156,
    "category": "Odd One Out",
    "difficulty": "Easy",
    "question": "Choose the odd one out from the following:",
    "options": {
      "A": "9",
      "B": "2",
      "C": "5",
      "D": "3"
    },
    "answer": "A",
    "solution": "2, 3 and 5 are prime numbers, while 9 is a composite number (3×3)."
  },
  {
    "id": 157,
    "category": "Odd One Out",
    "difficulty": "Easy",
    "question": "Choose the odd one out from the following:",
    "options": {
      "A": "16",
      "B": "25",
      "C": "40",
      "D": "36"
    },
    "answer": "C",
    "solution": "16, 25 and 36 are perfect squares (4²,5²,6²), while 40 is not a perfect square."
  },
  {
    "id": 158,
    "category": "Odd One Out",
    "difficulty": "Medium",
    "question": "Choose the odd one out from the following:",
    "options": {
      "A": "Sparrow",
      "B": "Cat",
      "C": "Dog",
      "D": "Lion"
    },
    "answer": "A",
    "solution": "Cat, Dog and Lion are mammals, while Sparrow is a bird."
  },
  {
    "id": 159,
    "category": "Odd One Out",
    "difficulty": "Medium",
    "question": "Choose the odd one out from the following:",
    "options": {
      "A": "January",
      "B": "May",
      "C": "April",
      "D": "March"
    },
    "answer": "C",
    "solution": "January, March and May have 31 days, while April has only 30 days."
  },
  {
    "id": 160,
    "category": "Odd One Out",
    "difficulty": "Hard",
    "question": "Choose the odd one out from the following:",
    "options": {
      "A": "13",
      "B": "21",
      "C": "11",
      "D": "7"
    },
    "answer": "B",
    "solution": "7, 11 and 13 are prime numbers, while 21 = 3 × 7 is a composite number."
  },
  {
    "id": 161,
    "category": "Syllogism",
    "difficulty": "Easy",
    "question": "Statements: All roses are flowers. All flowers are plants. Which conclusion logically follows?",
    "options": {
      "A": "No roses are plants",
      "B": "All roses are plants",
      "C": "All plants are roses",
      "D": "Some plants are not roses"
    },
    "answer": "B",
    "solution": "Since all roses are flowers and all flowers are plants, it logically follows that all roses are plants."
  },
  {
    "id": 162,
    "category": "Syllogism",
    "difficulty": "Easy",
    "question": "Statements: All cats are animals. Some animals are wild. Which conclusion logically follows?",
    "options": {
      "A": "Some cats may be wild",
      "B": "No cats are wild",
      "C": "All animals are cats",
      "D": "All cats are wild"
    },
    "answer": "A",
    "solution": "Since all cats are animals and some animals are wild, it is possible but not certain that some cats are wild — this is the only conclusion that logically follows without overstating the premises."
  },
  {
    "id": 163,
    "category": "Syllogism",
    "difficulty": "Medium",
    "question": "Statements: All pens are instruments. No instruments are toys. Which conclusion logically follows?",
    "options": {
      "A": "All toys are pens",
      "B": "All pens are toys",
      "C": "No pens are toys",
      "D": "Some pens are toys"
    },
    "answer": "C",
    "solution": "Since all pens are instruments and no instruments are toys, it follows that no pens are toys."
  },
  {
    "id": 164,
    "category": "Syllogism",
    "difficulty": "Medium",
    "question": "Statements: All squares are rectangles. All rectangles are quadrilaterals. Which conclusion logically follows?",
    "options": {
      "A": "Some quadrilaterals are not squares only",
      "B": "No squares are quadrilaterals",
      "C": "All squares are quadrilaterals",
      "D": "All quadrilaterals are squares"
    },
    "answer": "C",
    "solution": "Since all squares are rectangles and all rectangles are quadrilaterals, all squares are quadrilaterals."
  },
  {
    "id": 165,
    "category": "Syllogism",
    "difficulty": "Hard",
    "question": "Statements: No fish are mammals. All whales are mammals. Which conclusion logically follows?",
    "options": {
      "A": "No whales are fish",
      "B": "All mammals are whales",
      "C": "All whales are fish",
      "D": "Some fish are whales"
    },
    "answer": "A",
    "solution": "Since no fish are mammals and all whales are mammals, it follows that no whales are fish."
  },
  {
    "id": 166,
    "category": "Statement & Conclusion",
    "difficulty": "Easy",
    "question": "Statement: The government has announced a new policy to increase the use of renewable energy sources. Which of the following is the most reasonable conclusion?",
    "options": {
      "A": "The government has banned all non-renewable energy",
      "B": "The government is taking steps to promote renewable energy",
      "C": "The policy has already failed",
      "D": "Renewable energy is no longer needed"
    },
    "answer": "B",
    "solution": "The statement directly indicates that the government is taking action to promote renewable energy use."
  },
  {
    "id": 167,
    "category": "Statement & Conclusion",
    "difficulty": "Easy",
    "question": "Statement: Sales of the company's new product increased by 20% after the advertising campaign. Which of the following is the most reasonable conclusion?",
    "options": {
      "A": "The advertising campaign likely contributed to increased sales",
      "B": "Sales decreased after the campaign",
      "C": "Advertising had no effect on sales",
      "D": "The product will now be discontinued"
    },
    "answer": "A",
    "solution": "Since sales increased after the campaign, it is reasonable to conclude the campaign contributed to the increase."
  },
  {
    "id": 168,
    "category": "Statement & Conclusion",
    "difficulty": "Medium",
    "question": "Statement: Due to heavy rainfall, several flights were delayed at the city airport. Which of the following is the most reasonable conclusion?",
    "options": {
      "A": "Weather conditions affected flight schedules",
      "B": "Rainfall improved flight timings",
      "C": "All flights were cancelled permanently",
      "D": "The airport was closed forever"
    },
    "answer": "A",
    "solution": "The statement shows that heavy rainfall caused flight delays, meaning weather affected the schedule."
  },
  {
    "id": 169,
    "category": "Statement & Conclusion",
    "difficulty": "Medium",
    "question": "Statement: The school introduced a mandatory sports period to improve students' physical fitness. Which of the following is the most reasonable conclusion?",
    "options": {
      "A": "Physical fitness is not a school priority",
      "B": "All students dislike sports",
      "C": "Sports periods have been removed from schools",
      "D": "The school is taking steps to improve student fitness"
    },
    "answer": "D",
    "solution": "The statement indicates the school introduced a sports period specifically to improve fitness, showing active steps toward that goal."
  },
  {
    "id": 170,
    "category": "Statement & Conclusion",
    "difficulty": "Hard",
    "question": "Statement: The bank reduced its home loan interest rate to attract more customers. Which of the following is the most reasonable conclusion?",
    "options": {
      "A": "The bank aims to make its loans more attractive to customers",
      "B": "No customers are interested in loans",
      "C": "The bank has stopped offering home loans",
      "D": "Interest rates were increased sharply"
    },
    "answer": "A",
    "solution": "Reducing the interest rate is a step taken by the bank specifically to attract more customers, so the statement supports this conclusion."
  },
  {
    
    "id": 171,
    "category": "Seating Arrangement",
    "difficulty": "Easy",
    "question": "Five friends A, B, C, D and E are sitting in a row facing north. B is to the immediate right of A. C is to the immediate right of B. D is to the immediate right of C. E is at one of the ends. Who is sitting at the leftmost end?",
    "options": {
      "A": "C",
      "B": "E",
      "C": "B",
      "D": "A"
    },
    "answer": "D",
    "solution": "Since B is right of A, C is right of B, and D is right of C, the order from left is A, B, C, D, and E must be at the remaining end. As A has nothing to its left in this chain, A is the leftmost."
  },
  {
    "id": 172,
    "category": "Seating Arrangement",
    "difficulty": "Easy",
    "question": "Four people P, Q, R and S are sitting around a circular table facing the center. Q is second to the right of P. R is second to the right of Q. Who is sitting opposite P?",
    "options": {
      "A": "S",
      "B": "R",
      "C": "Q",
      "D": "P"
    },
    "answer": "B",
    "solution": "In a group of 4 seated in a circle, the person second to the right of Q (who is second to the right of P) ends up directly opposite P, which is R."
  },
  {
    "id": 173,
    "category": "Seating Arrangement",
    "difficulty": "Medium",
    "question": "In a row of six students facing north, M is third from the left and N is second from the right. How many students are sitting between M and N?",
    "options": {
      "A": "1",
      "B": "4",
      "C": "3",
      "D": "2"
    },
    "answer": "A",
    "solution": "In a row of 6, N being 2nd from the right means N is in the 5th position from the left (6−2+1=5). M is in the 3rd position. The positions between the 3rd and 5th positions contain only the 4th position, so exactly 1 student sits between M and N."
  },
  {
    "id": 174,
    "category": "Seating Arrangement",
    "difficulty": "Medium",
    "question": "Six people A, B, C, D, E and F are sitting in a row. C is between A and D. B is at the left end. E is to the immediate right of D. F is at the right end. Who is sitting third from the left?",
    "options": {
      "A": "C",
      "B": "A",
      "C": "D",
      "D": "E"
    },
    "answer": "A",
    "solution": "With B fixed at the left end and F at the right end, and C between A and D with E immediately right of D, the arrangement from left is B, A, C, D, E, F — making C the third person from the left."
  },
  {
    "id": 175,
    "category": "Seating Arrangement",
    "difficulty": "Hard",
    "question": "Seven students G, H, I, J, K, L and M are sitting in a row. J sits exactly in the middle, with three students to the left of J and three to the right. H is second from the left end. How many students sit between H and J?",
    "options": {
      "A": "3",
      "B": "2",
      "C": "4",
      "D": "1"
    },
    "answer": "D",
    "solution": "With 7 students in a row, the middle position is position 4, so J sits at position 4. H, being second from the left end, sits at position 2. The only seat strictly between position 2 and position 4 is position 3, so exactly 1 student sits between H and J."
  },
  {
    "id": 176,
    "category": "Logical Puzzles",
    "difficulty": "Easy",
    "question": "If FRIEND is coded as HTKGPF, how is CANDLE coded in the same pattern?",
    "options": {
      "A": "ECPFNG",
      "B": "ECPFMG",
      "C": "DBOEMF",
      "D": "EDPGNH"
    },
    "answer": "A",
    "solution": "Each letter is shifted forward by 2 positions in the alphabet (F→H, R→T, I→K, E→G, N→P, D→F). Applying the same shift to CANDLE: C→E, A→C, N→P, D→F, L→N, E→G, giving ECPFNG."
  },
  {
    "id": 177,
    "category": "Logical Puzzles",
    "difficulty": "Easy",
    "question": "A is twice as old as B. Five years ago, A was three times as old as B. What is B's current age?",
    "options": {
      "A": "8",
      "B": "12",
      "C": "10",
      "D": "15"
    },
    "answer": "C",
    "solution": "Let B = x, A = 2x. Five years ago: 2x−5 = 3(x−5) ⟹ 2x−5 = 3x−15 ⟹ x = 10. So B's current age is 10."
  },
  {
    "id": 178,
    "category": "Logical Puzzles",
    "difficulty": "Medium",
    "question": "In a certain code, 'RIVER' is written as 'SJWFS'. How is 'TABLE' written in that code?",
    "options": {
      "A": "TBCLF",
      "B": "UBCMF",
      "C": "UBCMG",
      "D": "VCDNG"
    },
    "answer": "B",
    "solution": "Each letter is shifted forward by 1 position (R→S, I→J, V→W, E→F, R→S). Applying to TABLE: T→U, A→B, B→C, L→M, E→F, giving UBCMF."
  },
  {
    "id": 179,
    "category": "Logical Puzzles",
    "difficulty": "Medium",
    "question": "A is the son of B. B is the mother of C. D is the father of A. How many sons does D have if C is also D's son?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "4",
      "D": "3"
    },
    "answer": "B",
    "solution": "D is A's father, so A is D's son. C is also stated to be D's son. That gives D two known sons, A and C, so D has 2 sons based on the information given."
  },
  {
    "id": 180,
    "category": "Logical Puzzles",
    "difficulty": "Hard",
    "question": "A clock shows 3:15. What is the angle between the hour hand and the minute hand?",
    "options": {
      "A": "0°",
      "B": "15°",
      "C": "7.5°",
      "D": "30°"
    },
    "answer": "C",
    "solution": "At 3:15, the minute hand points at the 3 (90° from 12). The hour hand moves 0.5° per minute, so by 15 minutes past 3 it has moved 3×30° + 15×0.5° = 90°+7.5° = 97.5°. The angle between them = 97.5° − 90° = 7.5°."
  },
  {
    "id": 181,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 600 employees distributed across departments as follows — Sales: 90; Marketing: 150; IT: 90; HR: 120; Finance: 90; Operations: 60. What percentage of employees work in the Finance department?",
    "options": {
      "A": "15.0",
      "B": "25.0",
      "C": "20.0",
      "D": "10.0"
    },
    "answer": "A",
    "solution": "Finance department has 90 employees out of 600 total. Percentage = (90/600) × 100 = 15.0%."
  },
  {
    "id": 182,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 1200 employees distributed across departments as follows — Sales: 300; Marketing: 180; IT: 180; HR: 180; Finance: 120; Operations: 240. What percentage of employees work in the Finance department?",
    "options": {
      "A": "5.0",
      "B": "20.0",
      "C": "10.0",
      "D": "15.0"
    },
    "answer": "C",
    "solution": "Finance department has 120 employees out of 1200 total. Percentage = (120/1200) × 100 = 10.0%."
  },
  {
    "id": 183,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 1200 employees distributed across departments as follows — Sales: 120; Marketing: 240; IT: 180; HR: 180; Finance: 180; Operations: 300. What percentage of employees work in the Operations department?",
    "options": {
      "A": "25.0",
      "B": "30.0",
      "C": "35.0",
      "D": "20.0"
    },
    "answer": "A",
    "solution": "Operations department has 300 employees out of 1200 total. Percentage = (300/1200) × 100 = 25.0%."
  },
  {
    "id": 184,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 800 employees distributed across departments as follows — Sales: 120; Marketing: 200; IT: 160; HR: 120; Finance: 120; Operations: 80. What percentage of employees work in the Finance department?",
    "options": {
      "A": "15.0",
      "B": "10.0",
      "C": "20.0",
      "D": "25.0"
    },
    "answer": "A",
    "solution": "Finance department has 120 employees out of 800 total. Percentage = (120/800) × 100 = 15.0%."
  },
  {
    "id": 185,
    "category": "Data Interpretation",
    "difficulty": "Hard",
    "question": "A company has 800 employees distributed across departments as follows — Sales: 200; Marketing: 120; IT: 120; HR: 80; Finance: 160; Operations: 120. What percentage of employees work in the Sales department?",
    "options": {
      "A": "25.0",
      "B": "30.0",
      "C": "35.0",
      "D": "20.0"
    },
    "answer": "A",
    "solution": "Sales department has 200 employees out of 800 total. Percentage = (200/800) × 100 = 25.0%."
  },
  {
    "id": 186,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 1200 employees distributed across departments as follows — Sales: 180; Marketing: 300; IT: 180; HR: 180; Finance: 240; Operations: 120. What percentage of employees work in the Finance department?",
    "options": {
      "A": "30.0",
      "B": "25.0",
      "C": "20.0",
      "D": "15.0"
    },
    "answer": "C",
    "solution": "Finance department has 240 employees out of 1200 total. Percentage = (240/1200) × 100 = 20.0%."
  },
  {
    "id": 187,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 600 employees distributed across departments as follows — Sales: 120; Marketing: 90; IT: 150; HR: 90; Finance: 60; Operations: 90. What percentage of employees work in the HR department?",
    "options": {
      "A": "10.0",
      "B": "25.0",
      "C": "15.0",
      "D": "20.0"
    },
    "answer": "C",
    "solution": "HR department has 90 employees out of 600 total. Percentage = (90/600) × 100 = 15.0%."
  },
  {
    "id": 188,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 1000 employees distributed across departments as follows — Sales: 200; Marketing: 150; IT: 150; HR: 100; Finance: 150; Operations: 250. What percentage of employees work in the IT department?",
    "options": {
      "A": "15.0",
      "B": "10.0",
      "C": "20.0",
      "D": "25.0"
    },
    "answer": "A",
    "solution": "IT department has 150 employees out of 1000 total. Percentage = (150/1000) × 100 = 15.0%."
  },
  {
    "id": 189,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 1500 employees distributed across departments as follows — Sales: 375; Marketing: 300; IT: 150; HR: 225; Finance: 225; Operations: 225. What percentage of employees work in the Marketing department?",
    "options": {
      "A": "15.0",
      "B": "30.0",
      "C": "25.0",
      "D": "20.0"
    },
    "answer": "D",
    "solution": "Marketing department has 300 employees out of 1500 total. Percentage = (300/1500) × 100 = 20.0%."
  },
  {
    "id": 190,
    "category": "Data Interpretation",
    "difficulty": "Hard",
    "question": "A company has 600 employees distributed across departments as follows — Sales: 90; Marketing: 90; IT: 90; HR: 150; Finance: 120; Operations: 60. What percentage of employees work in the IT department?",
    "options": {
      "A": "25.0",
      "B": "10.0",
      "C": "20.0",
      "D": "15.0"
    },
    "answer": "D",
    "solution": "IT department has 90 employees out of 600 total. Percentage = (90/600) × 100 = 15.0%."
  },
  {
    "id": 191,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 1000 employees distributed across departments as follows — Sales: 150; Marketing: 150; IT: 250; HR: 150; Finance: 200; Operations: 100. What percentage of employees work in the Finance department?",
    "options": {
      "A": "30.0",
      "B": "15.0",
      "C": "20.0",
      "D": "25.0"
    },
    "answer": "C",
    "solution": "Finance department has 200 employees out of 1000 total. Percentage = (200/1000) × 100 = 20.0%."
  },
  {
    "id": 192,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 600 employees distributed across departments as follows — Sales: 150; Marketing: 90; IT: 90; HR: 120; Finance: 60; Operations: 90. What percentage of employees work in the Marketing department?",
    "options": {
      "A": "15.0",
      "B": "20.0",
      "C": "10.0",
      "D": "25.0"
    },
    "answer": "A",
    "solution": "Marketing department has 90 employees out of 600 total. Percentage = (90/600) × 100 = 15.0%."
  },
  {
    "id": 193,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 1200 employees distributed across departments as follows — Sales: 180; Marketing: 180; IT: 240; HR: 120; Finance: 180; Operations: 300. What percentage of employees work in the Sales department?",
    "options": {
      "A": "15.0",
      "B": "10.0",
      "C": "20.0",
      "D": "25.0"
    },
    "answer": "A",
    "solution": "Sales department has 180 employees out of 1200 total. Percentage = (180/1200) × 100 = 15.0%."
  },
  {
    "id": 194,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 1200 employees distributed across departments as follows — Sales: 180; Marketing: 180; IT: 240; HR: 120; Finance: 300; Operations: 180. What percentage of employees work in the HR department?",
    "options": {
      "A": "15.0",
      "B": "5.0",
      "C": "10.0",
      "D": "20.0"
    },
    "answer": "C",
    "solution": "HR department has 120 employees out of 1200 total. Percentage = (120/1200) × 100 = 10.0%."
  },
  {
    "id": 195,
    "category": "Data Interpretation",
    "difficulty": "Hard",
    "question": "A company has 1200 employees distributed across departments as follows — Sales: 180; Marketing: 240; IT: 120; HR: 180; Finance: 300; Operations: 180. What percentage of employees work in the Sales department?",
    "options": {
      "A": "10.0",
      "B": "15.0",
      "C": "20.0",
      "D": "25.0"
    },
    "answer": "B",
    "solution": "Sales department has 180 employees out of 1200 total. Percentage = (180/1200) × 100 = 15.0%."
  },
  {
    "id": 196,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 1500 employees distributed across departments as follows — Sales: 375; Marketing: 225; IT: 300; HR: 150; Finance: 225; Operations: 225. What percentage of employees work in the Finance department?",
    "options": {
      "A": "20.0",
      "B": "25.0",
      "C": "15.0",
      "D": "10.0"
    },
    "answer": "C",
    "solution": "Finance department has 225 employees out of 1500 total. Percentage = (225/1500) × 100 = 15.0%."
  },
  {
    "id": 197,
    "category": "Data Interpretation",
    "difficulty": "Easy",
    "question": "A company has 1500 employees distributed across departments as follows — Sales: 225; Marketing: 150; IT: 225; HR: 225; Finance: 300; Operations: 375. What percentage of employees work in the IT department?",
    "options": {
      "A": "10.0",
      "B": "20.0",
      "C": "15.0",
      "D": "25.0"
    },
    "answer": "C",
    "solution": "IT department has 225 employees out of 1500 total. Percentage = (225/1500) × 100 = 15.0%."
  },
  {
    "id": 198,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 800 employees distributed across departments as follows — Sales: 120; Marketing: 160; IT: 80; HR: 120; Finance: 200; Operations: 120. What percentage of employees work in the Marketing department?",
    "options": {
      "A": "15.0",
      "B": "30.0",
      "C": "20.0",
      "D": "25.0"
    },
    "answer": "C",
    "solution": "Marketing department has 160 employees out of 800 total. Percentage = (160/800) × 100 = 20.0%."
  },
  {
    "id": 199,
    "category": "Data Interpretation",
    "difficulty": "Medium",
    "question": "A company has 1500 employees distributed across departments as follows — Sales: 225; Marketing: 225; IT: 150; HR: 300; Finance: 375; Operations: 225. What percentage of employees work in the IT department?",
    "options": {
      "A": "20.0",
      "B": "15.0",
      "C": "10.0",
      "D": "5.0"
    },
    "answer": "C",
    "solution": "IT department has 150 employees out of 1500 total. Percentage = (150/1500) × 100 = 10.0%."
  },
  {
    "id": 200,
    "category": "Data Interpretation",
    "difficulty": "Hard",
    "question": "A company has 600 employees distributed across departments as follows — Sales: 90; Marketing: 90; IT: 150; HR: 60; Finance: 90; Operations: 120. What percentage of employees work in the Sales department?",
    "options": {
      "A": "10.0",
      "B": "20.0",
      "C": "15.0",
      "D": "25.0"
    },
    "answer": "C",
    "solution": "Sales department has 90 employees out of 600 total. Percentage = (90/600) × 100 = 15.0%."
  }
];

const TOTAL_QUESTIONS = 200;
const TEST_DURATION_SECONDS = 90 * 60; // 90 minutes
const STORAGE_KEY = "aptitudeTestState";
const THEME_KEY = "aptitudeTheme";
const RESULT_KEY = "aptitudeTestResult";

/* ---------- App State ---------- */
let state = null;          // live in-progress test state
let timerInterval = null;
let orderedQuestions = []; // questions in the order used for this attempt (supports future randomization)
let reviewFilter = "all";
let reviewSearchTerm = "";
let reviewCategoryFilter = "all";

/* ---------- DOM Shortcuts ---------- */
const $ = (id) => document.getElementById(id);

/* =========================================================
   INITIALIZATION
   ========================================================= */
function initializeApp() {
  // Validate question bank
  if (!Array.isArray(QUESTIONS) || QUESTIONS.length !== TOTAL_QUESTIONS) {
    console.warn(
      `[Developer Warning] Expected exactly ${TOTAL_QUESTIONS} questions, found ${
        Array.isArray(QUESTIONS) ? QUESTIONS.length : "invalid data"
      }.`
    );
  }

  loadTheme();
  bindGlobalEvents();
  checkForSavedState();
  checkForPreviousResult();
}

function bindGlobalEvents() {
  $("themeToggleBtn").addEventListener("click", toggleTheme);

  $("startTestBtn").addEventListener("click", () => {
    const existing = readRawState();
    if (existing && !existing.completed) {
      openModal("startNewModal");
    } else {
      startTest();
    }
  });

  $("resumeTestBtn").addEventListener("click", resumeTest);
  $("startNewFromResumeBtn").addEventListener("click", () => openModal("startNewModal"));
  $("clearFromResumeBtn").addEventListener("click", () => openModal("clearDataModal"));
  $("clearDataLandingBtn").addEventListener("click", () => openModal("clearDataModal"));
  $("viewPrevResultBtn").addEventListener("click", () => {
    const result = loadPreviousResult();
    if (result) showResult(result, true);
  });

  $("confirmStartNewBtn").addEventListener("click", () => {
    closeModal("startNewModal");
    startTest();
  });

  $("confirmClearDataBtn").addEventListener("click", () => {
    closeModal("clearDataModal");
    clearSavedData();
  });

  $("prevBtn").addEventListener("click", () => navigateQuestion(-1));
  $("nextBtn").addEventListener("click", () => navigateQuestion(1));

  $("submitTestBtn").addEventListener("click", openSubmitModal);
  $("confirmSubmitBtn").addEventListener("click", () => {
    closeModal("submitModal");
    completeTest(false);
  });

  $("timeUpOkBtn").addEventListener("click", () => {
    closeModal("timeUpModal");
    const result = loadPreviousResult();
    if (result) showResult(result, false);
  });

  $("openNavigatorBtn").addEventListener("click", openMobileNavigator);
  $("openNavigatorBtnMobile").addEventListener("click", openMobileNavigator);

  $("downloadPdfBtn").addEventListener("click", generatePDF);
  $("startNewFromResultBtn").addEventListener("click", () => openModal("startNewModal"));
  $("clearDataFromResultBtn").addEventListener("click", () => openModal("clearDataModal"));

  $("reviewSearch").addEventListener("input", (e) => {
    reviewSearchTerm = e.target.value.trim().toLowerCase();
    renderReview();
  });

  document.querySelectorAll(".btn-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-filter").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      reviewFilter = btn.dataset.filter;
      renderReview();
    });
  });

  $("reviewCategoryFilter").addEventListener("change", (e) => {
    reviewCategoryFilter = e.target.value;
    renderReview();
  });

  window.addEventListener("beforeunload", () => {
    if (state && !state.completed) saveState();
  });
}

function openModal(id) {
  const modal = bootstrap.Modal.getOrCreateInstance($(id));
  modal.show();
}
function closeModal(id) {
  const modal = bootstrap.Modal.getOrCreateInstance($(id));
  modal.hide();
}
function openMobileNavigator() {
  bootstrap.Offcanvas.getOrCreateInstance($("navigatorOffcanvas")).show();
}

/* =========================================================
   THEME (Dark / Light)
   ========================================================= */
function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(saved);
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const icon = $("themeToggleBtn").querySelector("i");
  icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {
    console.error("Could not save theme preference:", e);
  }
}

/* =========================================================
   LANDING SCREEN — RESUME / PREVIOUS RESULT DETECTION
   ========================================================= */
function readRawState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to read saved state:", e);
    return null;
  }
}

function checkForSavedState() {
  const saved = readRawState();
  if (saved && !saved.completed) {
    const answeredCount = Object.values(saved.answers || {}).filter((v) => v !== null && v !== undefined).length;
    $("resumeSummary").textContent = `${answeredCount} of ${TOTAL_QUESTIONS} answered · currently on question ${
      (saved.currentQuestion || 0) + 1
    }.`;
    $("resumeBanner").hidden = false;
    $("clearDataLandingBtn").hidden = false;
  }
}

function loadPreviousResult() {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to read previous result:", e);
    return null;
  }
}

function checkForPreviousResult() {
  const result = loadPreviousResult();
  if (result) {
    $("prevResultScore").textContent = `Score: ${result.score}/${TOTAL_QUESTIONS}`;
    $("prevResultPct").textContent = `Percentage: ${result.percentage}%`;
    $("prevResultGrade").textContent = `Grade: ${result.grade}`;
    $("prevResultStatus").textContent = `Result: ${result.passed ? "PASS" : "FAIL"}`;
    $("prevResultCard").hidden = false;
    $("viewPrevResultBtn").hidden = false;
    $("clearDataLandingBtn").hidden = false;
  }
}

/* =========================================================
   STARTING / RESUMING A TEST
   ========================================================= */
function buildFreshState() {
  orderedQuestions = QUESTIONS.slice(); // randomization disabled by default per spec
  const answers = {};
  const correctness = {}; // "1": true | false | null(unanswered)
  orderedQuestions.forEach((q) => {
    answers[q.id] = null;
    correctness[q.id] = null;
  });
  return {
    currentQuestion: 0,
    order: orderedQuestions.map((q) => q.id),
    answers,
    correctness,
    score: 0,
    startTime: Date.now(),
    remainingTime: TEST_DURATION_SECONDS,
    completed: false,
    timestamp: Date.now(),
  };
}

function startTest() {
  state = buildFreshState();
  saveState();
  enterTestScreen();
}

function resumeTest() {
  const saved = readRawState();
  if (!saved) {
    startTest();
    return;
  }
  state = saved;
  // Restore question order (supports future randomization persistence)
  orderedQuestions = state.order
    ? state.order.map((id) => QUESTIONS.find((q) => q.id === id)).filter(Boolean)
    : QUESTIONS.slice();
  enterTestScreen();
}

function enterTestScreen() {
  $("startScreen").hidden = true;
  $("resultScreen").hidden = true;
  $("testScreen").hidden = false;
  $("headerProgressWrap").hidden = false;
  $("timerPill").hidden = false;
  $("openNavigatorBtn").hidden = false;
  $("brandSub").textContent = `${TOTAL_QUESTIONS} Questions`;

  renderQuestionNavigator();
  renderQuestion();
  updateProgress();
  updateStats();
  startTimerLoop();
}

/* =========================================================
   RENDERING THE CURRENT QUESTION
   ========================================================= */
function currentQuestionObj() {
  return orderedQuestions[state.currentQuestion];
}

function renderQuestion() {
  const q = currentQuestionObj();
  if (!q) return;

  $("qCountLabel").textContent = `Question ${state.currentQuestion + 1} of ${TOTAL_QUESTIONS}`;
  $("qCategoryBadge").textContent = q.category;
  $("qDifficultyBadge").textContent = q.difficulty;
  $("questionText").textContent = q.question;

  const grid = $("optionsGrid");
  grid.innerHTML = "";

  const selected = state.answers[q.id];
  const isAnswered = selected !== null && selected !== undefined;

  Object.entries(q.options).forEach(([letter, text]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-card";
    btn.setAttribute("aria-label", `Option ${letter}: ${text}`);

    const letterSpan = document.createElement("span");
    letterSpan.className = "option-letter";
    letterSpan.textContent = letter;

    const textSpan = document.createElement("span");
    textSpan.textContent = text;

    btn.appendChild(letterSpan);
    btn.appendChild(textSpan);

    if (isAnswered) {
      btn.disabled = true;
      if (letter === q.answer) {
        btn.classList.add("opt-correct");
        const icon = document.createElement("i");
        icon.className = "bi bi-check-circle-fill option-icon";
        btn.appendChild(icon);
      } else if (letter === selected) {
        btn.classList.add("opt-wrong");
        const icon = document.createElement("i");
        icon.className = "bi bi-x-circle-fill option-icon";
        btn.appendChild(icon);
      } else {
        btn.classList.add("opt-dimmed");
      }
    } else {
      btn.addEventListener("click", () => selectAnswer(letter));
    }

    grid.appendChild(btn);
  });

  const feedback = $("answerFeedback");
  if (isAnswered) {
    feedback.hidden = false;
    const wasCorrect = selected === q.answer;
    const banner = $("feedbackBanner");
    banner.className = "feedback-banner " + (wasCorrect ? "fb-correct" : "fb-wrong");
    banner.innerHTML = wasCorrect
      ? '<i class="bi bi-check-circle-fill"></i> Correct Answer'
      : `<i class="bi bi-x-circle-fill"></i> Incorrect Answer — Correct Answer: ${q.answer}. ${q.options[q.answer]}`;
    $("solutionText").textContent = q.solution;
  } else {
    feedback.hidden = true;
  }

  $("prevBtn").disabled = state.currentQuestion === 0;
  $("nextBtn").disabled = state.currentQuestion === TOTAL_QUESTIONS - 1;

  updateNavigatorHighlight();
}

/* =========================================================
   ANSWER SELECTION
   ========================================================= */
function selectAnswer(letter) {
  const q = currentQuestionObj();
  if (!q) return;

  // Prevent duplicate scoring if question already answered
  if (state.answers[q.id] !== null && state.answers[q.id] !== undefined) return;

  state.answers[q.id] = letter;
  const isCorrect = letter === q.answer; // correctness always derived from the answer key
  state.correctness[q.id] = isCorrect;
  if (isCorrect) state.score += 1;

  saveState();
  renderQuestion();
  updateProgress();
  updateStats();
  updateNavigatorHighlight();
}

/* =========================================================
   NAVIGATION
   ========================================================= */
function navigateQuestion(delta) {
  const next = state.currentQuestion + delta;
  if (next < 0 || next >= TOTAL_QUESTIONS) return;
  state.currentQuestion = next;
  saveState();
  renderQuestion();
}

function jumpToQuestion(index) {
  if (index < 0 || index >= TOTAL_QUESTIONS) return;
  state.currentQuestion = index;
  saveState();
  renderQuestion();
  const offcanvasEl = $("navigatorOffcanvas");
  const instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
  if (instance) instance.hide();
}

/* =========================================================
   QUESTION NAVIGATOR (sidebar + mobile offcanvas)
   ========================================================= */
function renderQuestionNavigator() {
  const desktopGrid = $("questionNavigator");
  const mobileGrid = $("questionNavigatorMobile");
  desktopGrid.innerHTML = "";
  mobileGrid.innerHTML = "";

  orderedQuestions.forEach((q, index) => {
    [desktopGrid, mobileGrid].forEach((grid) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nav-q-btn";
      btn.textContent = index + 1;
      btn.dataset.index = index;
      btn.addEventListener("click", () => jumpToQuestion(index));
      grid.appendChild(btn);
    });
  });

  updateNavigatorHighlight();
}

function updateNavigatorHighlight() {
  document.querySelectorAll(".nav-q-btn").forEach((btn) => {
    const idx = Number(btn.dataset.index);
    const q = orderedQuestions[idx];
    btn.classList.remove("nq-current", "nq-correct", "nq-wrong");
    if (!q) return;
    const correctness = state.correctness[q.id];
    if (idx === state.currentQuestion) {
      btn.classList.add("nq-current");
    } else if (correctness === true) {
      btn.classList.add("nq-correct");
    } else if (correctness === false) {
      btn.classList.add("nq-wrong");
    }
  });
}

/* =========================================================
   PROGRESS / STATS
   ========================================================= */
function computeStats() {
  const answers = Object.values(state.answers);
  const answered = answers.filter((a) => a !== null && a !== undefined).length;
  const correct = Object.values(state.correctness).filter((c) => c === true).length;
  const wrong = Object.values(state.correctness).filter((c) => c === false).length;
  const unanswered = TOTAL_QUESTIONS - answered;
  return { answered, correct, wrong, unanswered, remaining: unanswered };
}

function updateProgress() {
  const { answered } = computeStats();
  const pct = (answered / TOTAL_QUESTIONS) * 100;
  $("headerProgressText").textContent = `Progress: ${answered} / ${TOTAL_QUESTIONS}`;
  $("headerProgressFill").style.width = pct + "%";
  $("mainProgressFill").style.width = Math.max(pct, 0.5) + "%";
}

function updateStats() {
  const { answered, correct, wrong, remaining } = computeStats();
  $("statAnswered").textContent = answered;
  $("statRemaining").textContent = remaining;
  $("statCorrect").textContent = correct;
  $("statWrong").textContent = wrong;
  $("statAnsweredM").textContent = answered;
  $("statRemainingM").textContent = remaining;
  $("statCorrectM").textContent = correct;
  $("statWrongM").textContent = wrong;
}

/* =========================================================
   TIMER
   ========================================================= */
function startTimerLoop() {
  if (timerInterval) clearInterval(timerInterval);
  updateTimer();
  timerInterval = setInterval(() => {
    if (!state || state.completed) {
      clearInterval(timerInterval);
      return;
    }
    state.remainingTime -= 1;
    if (state.remainingTime <= 0) {
      state.remainingTime = 0;
      updateTimer();
      saveState();
      clearInterval(timerInterval);
      completeTest(true);
      return;
    }
    updateTimer();
    if (state.remainingTime % 5 === 0) saveState();
  }, 1000);
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function updateTimer() {
  if (!state) return;
  const pill = $("timerPill");
  $("timerText").textContent = formatTime(state.remainingTime);
  pill.classList.remove("timer-warn", "timer-danger");
  if (state.remainingTime <= 5 * 60) {
    pill.classList.add("timer-danger");
  } else if (state.remainingTime <= 10 * 60) {
    pill.classList.add("timer-warn");
  }
}

/* =========================================================
   AUTO-SAVE / LOAD
   ========================================================= */
function saveState() {
  if (!state) return;
  state.timestamp = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save test state:", e);
  }
}

function loadState() {
  return readRawState();
}

/* =========================================================
   SUBMIT FLOW
   ========================================================= */
function openSubmitModal() {
  const { answered, correct, wrong, unanswered } = computeStats();
  $("submitSummary").innerHTML = `
    <span>Answered: ${answered} / ${TOTAL_QUESTIONS}</span>
    <span>Unanswered: ${unanswered}</span>
    <span>Correct: ${correct}</span>
    <span>Wrong: ${wrong}</span>
  `;
  openModal("submitModal");
}

function completeTest(autoSubmitted) {
  if (!state || state.completed) return;
  state.completed = true;
  saveState();
  if (timerInterval) clearInterval(timerInterval);

  const result = calculateResult(autoSubmitted);
  try {
    localStorage.setItem(RESULT_KEY, JSON.stringify(result));
  } catch (e) {
    console.error("Failed to save result:", e);
  }

  if (autoSubmitted) {
    openModal("timeUpModal");
  } else {
    showResult(result, false);
  }
}

/* =========================================================
   RESULT CALCULATION
   ========================================================= */
function calculateResult(autoSubmitted) {
  const { answered, correct, wrong, unanswered } = computeStats();
  const percentage = Math.round((correct / TOTAL_QUESTIONS) * 10000) / 100;
  const grade = calculateGrade(percentage);
  const passed = percentage >= 50;
  const timeTakenSeconds = TEST_DURATION_SECONDS - state.remainingTime;

  // Category performance
  const categoryMap = {};
  orderedQuestions.forEach((q) => {
    if (!categoryMap[q.category]) categoryMap[q.category] = { correct: 0, total: 0 };
    categoryMap[q.category].total += 1;
    if (state.correctness[q.id] === true) categoryMap[q.category].correct += 1;
  });

  return {
    total: TOTAL_QUESTIONS,
    attempted: answered,
    correct,
    wrong,
    unanswered,
    score: correct,
    percentage,
    grade,
    passed,
    timeTakenSeconds,
    remainingTimeSeconds: state.remainingTime,
    categoryPerformance: categoryMap,
    answers: { ...state.answers },
    correctness: { ...state.correctness },
    order: [...state.order],
    autoSubmitted,
    completedAt: Date.now(),
  };
}

function calculateGrade(pct) {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

/* =========================================================
   RESULT SCREEN
   ========================================================= */
function showResult(result, fromPreviousResultView) {
  $("startScreen").hidden = true;
  $("testScreen").hidden = true;
  $("resultScreen").hidden = false;
  $("headerProgressWrap").hidden = true;
  $("timerPill").hidden = true;
  $("openNavigatorBtn").hidden = true;

  // If viewing a previous result without a live in-memory question order,
  // rebuild the ordered list from the stored order so review works.
  if (fromPreviousResultView || orderedQuestions.length === 0) {
    orderedQuestions = (result.order || QUESTIONS.map((q) => q.id)).map((id) =>
      QUESTIONS.find((q) => q.id === id)
    ).filter(Boolean);
  }

  $("ringScore").textContent = `${result.score}/${result.total}`;
  $("ringPct").textContent = `${result.percentage}%`;
  $("scoreRing").style.setProperty("--pct", result.percentage);

  $("gradePill").textContent = `Grade ${result.grade}`;
  const passPill = $("passPill");
  passPill.textContent = result.passed ? "✓ PASS" : "✕ FAIL";
  passPill.className = "pass-pill " + (result.passed ? "is-pass" : "is-fail");

  $("rTotal").textContent = result.total;
  $("rAttempted").textContent = result.attempted;
  $("rCorrect").textContent = result.correct;
  $("rWrong").textContent = result.wrong;
  $("rUnanswered").textContent = result.unanswered;
  $("rMarks").textContent = result.score;
  $("rTimeTaken").textContent = formatTime(result.timeTakenSeconds);
  $("rTimeRemaining").textContent = formatTime(result.remainingTimeSeconds);

  renderCategoryPerformance(result);
  populateReviewCategoryFilter(result);
  window.__lastResult = result; // used by PDF export & review
  renderReview();

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function renderCategoryPerformance(result) {
  const container = $("categoryPerformance");
  container.innerHTML = "";
  const entries = Object.entries(result.categoryPerformance).sort((a, b) => a[0].localeCompare(b[0]));
  entries.forEach(([category, data]) => {
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    const row = document.createElement("div");
    row.className = "cat-perf-row";
    row.innerHTML = `
      <span class="cat-perf-name">${category}</span>
      <span class="cat-perf-bar-wrap"><span class="cat-perf-bar" style="width:${pct}%"></span></span>
      <span class="cat-perf-score">${data.correct}/${data.total} · ${pct}%</span>
    `;
    container.appendChild(row);
  });
}

function populateReviewCategoryFilter(result) {
  const select = $("reviewCategoryFilter");
  select.innerHTML = '<option value="all">All Categories</option>';
  const categories = Object.keys(result.categoryPerformance).sort((a, b) => a.localeCompare(b));
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  reviewCategoryFilter = "all";
}

function renderReview() {
  const result = window.__lastResult;
  if (!result) return;

  const accordion = $("reviewAccordion");
  accordion.innerHTML = "";
  let shownCount = 0;

  orderedQuestions.forEach((q, index) => {
    const selected = result.answers[q.id];
    const isAnswered = selected !== null && selected !== undefined;
    const isCorrect = result.correctness[q.id] === true;

    let statusKey = "unanswered";
    if (isAnswered) statusKey = isCorrect ? "correct" : "wrong";

    if (reviewFilter !== "all" && reviewFilter !== statusKey) return;
    if (reviewCategoryFilter !== "all" && q.category !== reviewCategoryFilter) return;
    if (reviewSearchTerm && !q.question.toLowerCase().includes(reviewSearchTerm)) return;

    shownCount += 1;

    const item = document.createElement("div");
    item.className = "accordion-item";

    const headerId = `heading-${q.id}`;
    const collapseId = `collapse-${q.id}`;
    const tagClass = statusKey === "correct" ? "rt-correct" : statusKey === "wrong" ? "rt-wrong" : "rt-unanswered";
    const tagLabel = statusKey === "correct" ? "Correct" : statusKey === "wrong" ? "Wrong" : "Unanswered";

    item.innerHTML = `
      <h2 class="accordion-header" id="${headerId}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
          Question ${index + 1}. ${escapeHtml(q.question.slice(0, 70))}${q.question.length > 70 ? "…" : ""}
          <span class="review-tag ${tagClass}">${tagLabel}</span>
        </button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#reviewAccordion">
        <div class="accordion-body">
          <p class="review-body-line"><strong>Question ${index + 1}:</strong> ${escapeHtml(q.question)}</p>
          <p class="review-body-line"><strong>Your Answer:</strong> ${
            isAnswered ? `${selected}. ${escapeHtml(q.options[selected])}` : "Not answered"
          }</p>
          <p class="review-body-line"><strong>Correct Answer:</strong> ${q.answer}. ${escapeHtml(q.options[q.answer])}</p>
          <p class="review-body-line"><strong>Solution:</strong> ${escapeHtml(q.solution)}</p>
        </div>
      </div>
    `;
    accordion.appendChild(item);
  });

  $("reviewEmptyMsg").hidden = shownCount !== 0;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* =========================================================
   PDF GENERATION
   ========================================================= */
function generatePDF() {
  const result = window.__lastResult;
  if (!result) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  let y = margin;

  function ensureSpace(lineHeight) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  function addWrappedText(text, x, fontSize, fontStyle, lineHeight, color) {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle || "normal");
    if (color) doc.setTextColor(...color); else doc.setTextColor(20, 20, 20);
    const maxWidth = pageWidth - margin - x;
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, x, y);
      y += lineHeight;
    });
  }

  // Header
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageWidth, 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("APTITUDE ASSESSMENT", margin, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Recruitment Screening Test — Candidate Result", margin, 58);
  y = 95;

  // Score summary
  addWrappedText("Candidate Result Summary", margin, 15, "bold", 20);
  addWrappedText(`Score: ${result.score} / ${result.total}`, margin, 11, "normal", 16);
  addWrappedText(`Percentage: ${result.percentage}%`, margin, 11, "normal", 16);
  addWrappedText(`Grade: ${result.grade}`, margin, 11, "normal", 16);
  addWrappedText(`Result: ${result.passed ? "PASS" : "FAIL"}`, margin, 11, "normal", 16);
  addWrappedText(`Total Questions: ${result.total}`, margin, 11, "normal", 16);
  addWrappedText(`Attempted: ${result.attempted}`, margin, 11, "normal", 16);
  addWrappedText(`Correct: ${result.correct}`, margin, 11, "normal", 16);
  addWrappedText(`Wrong: ${result.wrong}`, margin, 11, "normal", 16);
  addWrappedText(`Unanswered: ${result.unanswered}`, margin, 11, "normal", 16);
  addWrappedText(`Time Taken: ${formatTime(result.timeTakenSeconds)}`, margin, 11, "normal", 16);
  y += 10;

  // Category performance
  ensureSpace(30);
  addWrappedText("Category Performance", margin, 15, "bold", 20);
  const categories = Object.entries(result.categoryPerformance).sort((a, b) => a[0].localeCompare(b[0]));
  categories.forEach(([cat, data]) => {
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    addWrappedText(`${cat}: ${data.correct} / ${data.total} (${pct}%)`, margin, 10.5, "normal", 15);
  });
  y += 10;

  // Question review
  ensureSpace(30);
  addWrappedText("Question Review", margin, 15, "bold", 20);

  orderedQuestions.forEach((q, index) => {
    ensureSpace(20);
    const selected = result.answers[q.id];
    const isAnswered = selected !== null && selected !== undefined;
    const isCorrect = result.correctness[q.id] === true;
    const statusLabel = !isAnswered ? "Unanswered" : isCorrect ? "Correct" : "Wrong";
    const statusColor = !isAnswered ? [120, 120, 120] : isCorrect ? [22, 163, 74] : [220, 38, 38];

    addWrappedText(`Q${index + 1}. ${q.question}`, margin, 10.5, "bold", 14);
    addWrappedText(
      `Your Answer: ${isAnswered ? `${selected}. ${q.options[selected]}` : "Not answered"}`,
      margin,
      10,
      "normal",
      13
    );
    addWrappedText(`Correct Answer: ${q.answer}. ${q.options[q.answer]}`, margin, 10, "normal", 13);
    addWrappedText(`Result: ${statusLabel}`, margin, 10, "bold", 13, statusColor);
    addWrappedText(`Solution: ${q.solution}`, margin, 10, "normal", 13);
    y += 6;
  });

  doc.save("aptitude-assessment-result.pdf");
}

/* =========================================================
   CLEAR SAVED DATA
   ========================================================= */
function clearSavedData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(RESULT_KEY);
  } catch (e) {
    console.error("Failed to clear saved data:", e);
  }
  if (timerInterval) clearInterval(timerInterval);
  state = null;
  orderedQuestions = [];
  window.__lastResult = null;

  $("resumeBanner").hidden = true;
  $("prevResultCard").hidden = true;
  $("viewPrevResultBtn").hidden = true;
  $("clearDataLandingBtn").hidden = true;

  $("testScreen").hidden = true;
  $("resultScreen").hidden = true;
  $("startScreen").hidden = false;
  $("headerProgressWrap").hidden = true;
  $("timerPill").hidden = true;
  $("openNavigatorBtn").hidden = true;
}

/* =========================================================
   BOOTSTRAP
   ========================================================= */
document.addEventListener("DOMContentLoaded", initializeApp);