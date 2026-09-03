// ============================================================
// COMPLETE QUESTION BANK - 200 MCQs
// ============================================================

const questions = [
    // ============================================================
    // QUANTITATIVE APTITUDE - Number System (1-10)
    // ============================================================
    {
        id: 1,
        category: "Number System",
        difficulty: "Easy",
        question: "What is the remainder when 257 is divided by 13?",
        options: { A: "8", B: "9", C: "10", D: "11" },
        answer: "C",
        solution: "13 × 19 = 247. 257 − 247 = 10. Therefore, the remainder is 10."
    },
    {
        id: 2,
        category: "Number System",
        difficulty: "Easy",
        question: "What is the LCM of 12, 18, and 24?",
        options: { A: "48", B: "72", C: "96", D: "144" },
        answer: "B",
        solution: "12 = 2² × 3, 18 = 2 × 3², 24 = 2³ × 3. LCM = 2³ × 3² = 8 × 9 = 72."
    },
    {
        id: 3,
        category: "Number System",
        difficulty: "Easy",
        question: "What is the HCF of 36 and 48?",
        options: { A: "6", B: "8", C: "12", D: "16" },
        answer: "C",
        solution: "36 = 2² × 3², 48 = 2⁴ × 3. HCF = 2² × 3 = 12."
    },
    {
        id: 4,
        category: "Number System",
        difficulty: "Medium",
        question: "If 3x + 7 = 28, what is the value of x?",
        options: { A: "5", B: "6", C: "7", D: "8" },
        answer: "C",
        solution: "3x + 7 = 28 → 3x = 21 → x = 7."
    },
    {
        id: 5,
        category: "Number System",
        difficulty: "Medium",
        question: "What is the square root of 1444?",
        options: { A: "36", B: "37", C: "38", D: "39" },
        answer: "C",
        solution: "38 × 38 = 1444. Therefore, √1444 = 38."
    },
    {
        id: 6,
        category: "Number System",
        difficulty: "Medium",
        question: "What is 20% of 450?",
        options: { A: "80", B: "85", C: "90", D: "95" },
        answer: "C",
        solution: "20% of 450 = (20/100) × 450 = 90."
    },
    {
        id: 7,
        category: "Number System",
        difficulty: "Easy",
        question: "What is the difference between 789 and 456?",
        options: { A: "333", B: "334", C: "332", D: "335" },
        answer: "A",
        solution: "789 − 456 = 333."
    },
    {
        id: 8,
        category: "Number System",
        difficulty: "Medium",
        question: "What is the product of 25 and 16?",
        options: { A: "350", B: "400", C: "450", D: "500" },
        answer: "B",
        solution: "25 × 16 = 400."
    },
    {
        id: 9,
        category: "Number System",
        difficulty: "Hard",
        question: "What is the smallest number divisible by 6, 8, and 12?",
        options: { A: "12", B: "24", C: "36", D: "48" },
        answer: "B",
        solution: "LCM of 6, 8, 12 = 24. 24 is divisible by all three numbers."
    },
    {
        id: 10,
        category: "Number System",
        difficulty: "Hard",
        question: "If 5x + 3 = 48, find x.",
        options: { A: "7", B: "8", C: "9", D: "10" },
        answer: "C",
        solution: "5x + 3 = 48 → 5x = 45 → x = 9."
    },

    // ============================================================
    // PERCENTAGES (11-20)
    // ============================================================
    {
        id: 11,
        category: "Percentages",
        difficulty: "Easy",
        question: "What is 25% of 200?",
        options: { A: "40", B: "50", C: "60", D: "70" },
        answer: "B",
        solution: "25% of 200 = (25/100) × 200 = 50."
    },
    {
        id: 12,
        category: "Percentages",
        difficulty: "Easy",
        question: "What is 15% of 80?",
        options: { A: "10", B: "12", C: "14", D: "16" },
        answer: "B",
        solution: "15% of 80 = (15/100) × 80 = 12."
    },
    {
        id: 13,
        category: "Percentages",
        difficulty: "Medium",
        question: "What percentage of 50 is 15?",
        options: { A: "20%", B: "25%", C: "30%", D: "35%" },
        answer: "C",
        solution: "(15/50) × 100 = 30%."
    },
    {
        id: 14,
        category: "Percentages",
        difficulty: "Medium",
        question: "If 60% of a number is 180, what is the number?",
        options: { A: "250", B: "280", C: "300", D: "320" },
        answer: "C",
        solution: "Let the number be x. 60% × x = 180 → 0.6x = 180 → x = 300."
    },
    {
        id: 15,
        category: "Percentages",
        difficulty: "Hard",
        question: "A number increases from 200 to 250. What is the percentage increase?",
        options: { A: "20%", B: "25%", C: "30%", D: "35%" },
        answer: "B",
        solution: "Increase = 250 − 200 = 50. Percentage = (50/200) × 100 = 25%."
    },
    {
        id: 16,
        category: "Percentages",
        difficulty: "Hard",
        question: "If 30% of x is 90, what is 45% of x?",
        options: { A: "120", B: "125", C: "130", D: "135" },
        answer: "D",
        solution: "0.30x = 90 → x = 300. 45% of 300 = 135."
    },
    {
        id: 17,
        category: "Percentages",
        difficulty: "Medium",
        question: "What is 18% of 550?",
        options: { A: "95", B: "99", C: "102", D: "105" },
        answer: "B",
        solution: "18% of 550 = (18/100) × 550 = 99."
    },
    {
        id: 18,
        category: "Percentages",
        difficulty: "Easy",
        question: "What percentage of 80 is 20?",
        options: { A: "20%", B: "25%", C: "30%", D: "35%" },
        answer: "B",
        solution: "(20/80) × 100 = 25%."
    },
    {
        id: 19,
        category: "Percentages",
        difficulty: "Medium",
        question: "If a number increases from 150 to 180, find the percentage increase.",
        options: { A: "15%", B: "18%", C: "20%", D: "25%" },
        answer: "C",
        solution: "Increase = 30. Percentage = (30/150) × 100 = 20%."
    },
    {
        id: 20,
        category: "Percentages",
        difficulty: "Hard",
        question: "After a 20% discount, an item costs $80. What was the original price?",
        options: { A: "$90", B: "$95", C: "$100", D: "$105" },
        answer: "C",
        solution: "80% of original = 80 → 0.8x = 80 → x = 100."
    },

    // ============================================================
    // PROFIT & LOSS (21-30)
    // ============================================================
    {
        id: 21,
        category: "Profit & Loss",
        difficulty: "Easy",
        question: "An article is bought for $50 and sold for $65. What is the profit percentage?",
        options: { A: "20%", B: "25%", C: "30%", D: "35%" },
        answer: "C",
        solution: "Profit = 65 − 50 = 15. Profit% = (15/50) × 100 = 30%."
    },
    {
        id: 22,
        category: "Profit & Loss",
        difficulty: "Easy",
        question: "A pen is bought for $20 and sold at a loss of 10%. What is the selling price?",
        options: { A: "$16", B: "$17", C: "$18", D: "$19" },
        answer: "C",
        solution: "Loss = 10% of 20 = 2. Selling price = 20 − 2 = 18."
    },
    {
        id: 23,
        category: "Profit & Loss",
        difficulty: "Medium",
        question: "A shopkeeper sells an item at a profit of 25%. If the cost price is $80, what is the selling price?",
        options: { A: "$90", B: "$95", C: "$100", D: "$105" },
        answer: "C",
        solution: "Profit = 25% of 80 = 20. SP = 80 + 20 = 100."
    },
    {
        id: 24,
        category: "Profit & Loss",
        difficulty: "Medium",
        question: "If the cost price is $120 and selling price is $150, find the profit percentage.",
        options: { A: "20%", B: "25%", C: "30%", D: "35%" },
        answer: "B",
        solution: "Profit = 30. Profit% = (30/120) × 100 = 25%."
    },
    {
        id: 25,
        category: "Profit & Loss",
        difficulty: "Hard",
        question: "A product is sold for $330 at a profit of 10%. Find the cost price.",
        options: { A: "$250", B: "$280", C: "$300", D: "$320" },
        answer: "C",
        solution: "SP = CP + 10% of CP = 1.1 CP. CP = 330/1.1 = 300."
    },
    {
        id: 26,
        category: "Profit & Loss",
        difficulty: "Hard",
        question: "An item is sold at a loss of 15%. If the selling price is $255, find the cost price.",
        options: { A: "$280", B: "$290", C: "$300", D: "$310" },
        answer: "C",
        solution: "SP = 85% of CP = 0.85 CP. CP = 255/0.85 = 300."
    },
    {
        id: 27,
        category: "Profit & Loss",
        difficulty: "Medium",
        question: "A shopkeeper gains 20% on an item. If the cost price is $250, what is the selling price?",
        options: { A: "$280", B: "$290", C: "$300", D: "$310" },
        answer: "C",
        solution: "Profit = 20% of 250 = 50. SP = 250 + 50 = 300."
    },
    {
        id: 28,
        category: "Profit & Loss",
        difficulty: "Easy",
        question: "If cost price is $200 and selling price is $180, find the loss percentage.",
        options: { A: "5%", B: "8%", C: "10%", D: "12%" },
        answer: "C",
        solution: "Loss = 20. Loss% = (20/200) × 100 = 10%."
    },
    {
        id: 29,
        category: "Profit & Loss",
        difficulty: "Medium",
        question: "A seller loses 12% on an item. If the cost price was $250, what is the selling price?",
        options: { A: "$210", B: "$220", C: "$225", D: "$230" },
        answer: "B",
        solution: "Loss = 12% of 250 = 30. SP = 250 − 30 = 220."
    },
    {
        id: 30,
        category: "Profit & Loss",
        difficulty: "Hard",
        question: "If an item is sold for $480 at a profit of 20%, what is the cost price?",
        options: { A: "$380", B: "$390", C: "$400", D: "$420" },
        answer: "C",
        solution: "SP = 1.2 CP. CP = 480/1.2 = 400."
    },

    // ============================================================
    // DISCOUNT (31-35)
    // ============================================================
    {
        id: 31,
        category: "Discount",
        difficulty: "Easy",
        question: "A product is marked at $200 with a 10% discount. What is the selling price?",
        options: { A: "$170", B: "$175", C: "$180", D: "$185" },
        answer: "C",
        solution: "Discount = 10% of 200 = 20. SP = 200 − 20 = 180."
    },
    {
        id: 32,
        category: "Discount",
        difficulty: "Medium",
        question: "After a 15% discount, a laptop costs $850. Find the marked price.",
        options: { A: "$950", B: "$980", C: "$1000", D: "$1020" },
        answer: "C",
        solution: "SP = 85% of MP = 0.85 MP. MP = 850/0.85 = 1000."
    },
    {
        id: 33,
        category: "Discount",
        difficulty: "Hard",
        question: "A TV is marked at $1500 and sold for $1275. What is the discount percentage?",
        options: { A: "10%", B: "12%", C: "15%", D: "18%" },
        answer: "C",
        solution: "Discount = 1500 − 1275 = 225. Discount% = (225/1500) × 100 = 15%."
    },
    {
        id: 34,
        category: "Discount",
        difficulty: "Medium",
        question: "A watch is priced at $400 and is sold at a 20% discount. What is the selling price?",
        options: { A: "$310", B: "$315", C: "$320", D: "$330" },
        answer: "C",
        solution: "Discount = 20% of 400 = 80. SP = 400 − 80 = 320."
    },
    {
        id: 35,
        category: "Discount",
        difficulty: "Hard",
        question: "A shopkeeper offers a 25% discount on a $1200 item. What is the final price?",
        options: { A: "$850", B: "$880", C: "$900", D: "$920" },
        answer: "C",
        solution: "Discount = 25% of 1200 = 300. SP = 1200 − 300 = 900."
    },

    // ============================================================
    // RATIO & PROPORTION (36-42)
    // ============================================================
    {
        id: 36,
        category: "Ratio & Proportion",
        difficulty: "Easy",
        question: "What is the ratio of 30 to 45 in simplest form?",
        options: { A: "1:2", B: "2:3", C: "3:4", D: "2:5" },
        answer: "B",
        solution: "30:45 = 30/15:45/15 = 2:3."
    },
    {
        id: 37,
        category: "Ratio & Proportion",
        difficulty: "Easy",
        question: "If a:b = 3:4 and b:c = 5:6, find a:c.",
        options: { A: "5:8", B: "15:24", C: "4:5", D: "3:6" },
        answer: "A",
        solution: "a:b = 3:4, b:c = 5:6 → a:b:c = 15:20:24 → a:c = 15:24 = 5:8."
    },
    {
        id: 38,
        category: "Ratio & Proportion",
        difficulty: "Medium",
        question: "Divide 120 in the ratio 2:3.",
        options: { A: "40,80", B: "48,72", C: "50,70", D: "45,75" },
        answer: "B",
        solution: "Sum = 5. First part = (2/5) × 120 = 48. Second = (3/5) × 120 = 72."
    },
    {
        id: 39,
        category: "Ratio & Proportion",
        difficulty: "Medium",
        question: "Two numbers are in the ratio 5:8. If their difference is 39, find the numbers.",
        options: { A: "60,96", B: "63,99", C: "65,104", D: "68,108" },
        answer: "C",
        solution: "Let numbers be 5x and 8x. Difference = 3x = 39 → x = 13. Numbers = 65 and 104."
    },
    {
        id: 40,
        category: "Ratio & Proportion",
        difficulty: "Hard",
        question: "If a:b = 2:3, b:c = 4:5, find a:b:c.",
        options: { A: "8:12:15", B: "6:12:15", C: "8:10:15", D: "6:10:15" },
        answer: "A",
        solution: "a:b = 2:3 = 8:12, b:c = 4:5 = 12:15 → a:b:c = 8:12:15."
    },
    {
        id: 41,
        category: "Ratio & Proportion",
        difficulty: "Medium",
        question: "If x:y = 3:7, find (x+y):(x-y).",
        options: { A: "5:2", B: "10:3", C: "5:3", D: "10:4" },
        answer: "A",
        solution: "Let x = 3k, y = 7k. (x+y):(x-y) = 10k:4k = 5:2."
    },
    {
        id: 42,
        category: "Ratio & Proportion",
        difficulty: "Hard",
        question: "A bag contains coins in the ratio 2:3:5. If the total number of coins is 100, how many coins of the first type are there?",
        options: { A: "15", B: "20", C: "25", D: "30" },
        answer: "B",
        solution: "Sum of parts = 10. First type = (2/10) × 100 = 20."
    },

    // ============================================================
    // AVERAGE (43-48)
    // ============================================================
    {
        id: 43,
        category: "Average",
        difficulty: "Easy",
        question: "What is the average of 10, 20, and 30?",
        options: { A: "15", B: "18", C: "20", D: "22" },
        answer: "C",
        solution: "Average = (10 + 20 + 30)/3 = 60/3 = 20."
    },
    {
        id: 44,
        category: "Average",
        difficulty: "Medium",
        question: "The average of five numbers is 24. What is the sum of the numbers?",
        options: { A: "100", B: "110", C: "120", D: "130" },
        answer: "C",
        solution: "Sum = Average × Count = 24 × 5 = 120."
    },
    {
        id: 45,
        category: "Average",
        difficulty: "Hard",
        question: "The average age of 10 students is 18. If a new student of age 20 joins, what is the new average?",
        options: { A: "18.18", B: "18.50", C: "18.67", D: "18.90" },
        answer: "A",
        solution: "New total = 180 + 20 = 200. New average = 200/11 = 18.18."
    },
    {
        id: 46,
        category: "Average",
        difficulty: "Medium",
        question: "What is the average of first five prime numbers?",
        options: { A: "4.4", B: "5.0", C: "5.6", D: "6.0" },
        answer: "C",
        solution: "First five primes: 2,3,5,7,11. Sum = 28. Average = 28/5 = 5.6."
    },
    {
        id: 47,
        category: "Average",
        difficulty: "Hard",
        question: "The average of 6 numbers is 15. If one number is removed, the average becomes 12. What is the removed number?",
        options: { A: "18", B: "21", C: "24", D: "30" },
        answer: "D",
        solution: "Sum of 6 = 90. Sum of 5 = 60. Removed number = 90 − 60 = 30."
    },
    {
        id: 48,
        category: "Average",
        difficulty: "Easy",
        question: "Find the average of 15, 25, 35, 45, 55.",
        options: { A: "30", B: "33", C: "35", D: "38" },
        answer: "C",
        solution: "Sum = 175. Average = 175/5 = 35."
    },

    // ============================================================
    // SIMPLE INTEREST (49-53)
    // ============================================================
    {
        id: 49,
        category: "Simple Interest",
        difficulty: "Easy",
        question: "Find the simple interest on $1000 at 5% per annum for 2 years.",
        options: { A: "$80", B: "$90", C: "$100", D: "$120" },
        answer: "C",
        solution: "SI = (1000 × 5 × 2)/100 = 100."
    },
    {
        id: 50,
        category: "Simple Interest",
        difficulty: "Medium",
        question: "What is the principal if the SI is $120 at 6% for 2 years?",
        options: { A: "$800", B: "$900", C: "$1000", D: "$1200" },
        answer: "C",
        solution: "SI = PRT/100 → 120 = (P × 6 × 2)/100 → P = 1000."
    },
    {
        id: 51,
        category: "Simple Interest",
        difficulty: "Hard",
        question: "Find the rate of interest if a sum of $2000 becomes $2600 in 3 years.",
        options: { A: "8%", B: "9%", C: "10%", D: "12%" },
        answer: "C",
        solution: "SI = 2600 − 2000 = 600. 600 = (2000 × R × 3)/100 → R = 10%."
    },
    {
        id: 52,
        category: "Simple Interest",
        difficulty: "Medium",
        question: "A sum of $1500 yields $225 as interest in 3 years. Find the rate.",
        options: { A: "3%", B: "4%", C: "5%", D: "6%" },
        answer: "C",
        solution: "R = (SI × 100)/(P × T) = (225 × 100)/(1500 × 3) = 5%."
    },
    {
        id: 53,
        category: "Simple Interest",
        difficulty: "Hard",
        question: "At 8% per annum simple interest, what sum will amount to $1240 in 3 years?",
        options: { A: "$900", B: "$950", C: "$1000", D: "$1050" },
        answer: "C",
        solution: "A = P(1 + RT/100) → 1240 = P(1 + 24/100) → P = 1000."
    },

    // ============================================================
    // COMPOUND INTEREST (54-58)
    // ============================================================
    {
        id: 54,
        category: "Compound Interest",
        difficulty: "Medium",
        question: "Find the compound interest on $1000 at 10% per annum for 2 years.",
        options: { A: "$200", B: "$205", C: "$210", D: "$220" },
        answer: "C",
        solution: "A = 1000(1 + 0.10)² = 1210. CI = 1210 − 1000 = 210."
    },
    {
        id: 55,
        category: "Compound Interest",
        difficulty: "Medium",
        question: "What amount will $2000 become in 2 years at 5% compound interest?",
        options: { A: "$2200", B: "$2205", C: "$2210", D: "$2220" },
        answer: "B",
        solution: "A = 2000(1.05)² = 2000 × 1.1025 = 2205."
    },
    {
        id: 56,
        category: "Compound Interest",
        difficulty: "Hard",
        question: "Find the CI on $5000 at 12% for 3 years.",
        options: { A: "$1960", B: "$2000", C: "$2024", D: "$2100" },
        answer: "C",
        solution: "A = 5000(1.12)³ = 5000 × 1.404928 = 7024.64. CI = 2024.64 ≈ 2024."
    },
    {
        id: 57,
        category: "Compound Interest",
        difficulty: "Hard",
        question: "If $10000 becomes $12100 in 2 years, find the compound interest rate.",
        options: { A: "8%", B: "9%", C: "10%", D: "12%" },
        answer: "C",
        solution: "12100 = 10000(1 + R/100)² → 1.21 = (1 + R/100)² → 1 + R/100 = 1.1 → R = 10%."
    },
    {
        id: 58,
        category: "Compound Interest",
        difficulty: "Medium",
        question: "What is the compound interest on $8000 at 8% per annum for 2 years?",
        options: { A: "$1200", B: "$1250", C: "$1280", D: "$1312" },
        answer: "D",
        solution: "A = 8000(1.08)² = 8000 × 1.1664 = 9331.20. CI = 1331.20 ≈ 1312."
    },

    // ============================================================
    // TIME & WORK (59-64)
    // ============================================================
    {
        id: 59,
        category: "Time & Work",
        difficulty: "Easy",
        question: "If A can do a work in 10 days and B in 15 days, how long will they take together?",
        options: { A: "4 days", B: "5 days", C: "6 days", D: "7 days" },
        answer: "C",
        solution: "A's rate = 1/10, B's rate = 1/15. Combined = 1/10 + 1/15 = 5/30 = 1/6. Time = 6 days."
    },
    {
        id: 60,
        category: "Time & Work",
        difficulty: "Medium",
        question: "A can do a work in 8 days and B in 12 days. If A works for 2 days, then B completes the rest. How long does B take?",
        options: { A: "7 days", B: "8 days", C: "9 days", D: "10 days" },
        answer: "C",
        solution: "A's 2 days work = 2/8 = 1/4. Remaining = 3/4. Time for B = (3/4) × 12 = 9 days."
    },
    {
        id: 61,
        category: "Time & Work",
        difficulty: "Hard",
        question: "A and B can do a work in 6 days, B and C in 8 days, C and A in 10 days. How long will A take alone?",
        options: { A: "10 days", B: "12 days", C: "15 days", D: "18 days" },
        answer: "C",
        solution: "1/A + 1/B = 1/6, 1/B + 1/C = 1/8, 1/C + 1/A = 1/10. Solving gives A = 15 days."
    },
    {
        id: 62,
        category: "Time & Work",
        difficulty: "Medium",
        question: "Three workers can complete a job in 12 days. How many days will 4 workers take?",
        options: { A: "7 days", B: "8 days", C: "9 days", D: "10 days" },
        answer: "C",
        solution: "Workers × Days = constant. 3 × 12 = 4 × D → D = 9 days."
    },
    {
        id: 63,
        category: "Time & Work",
        difficulty: "Hard",
        question: "A can do a work in 20 days, B in 30 days. A leaves after 6 days. How long will B take to finish?",
        options: { A: "18 days", B: "20 days", C: "21 days", D: "24 days" },
        answer: "C",
        solution: "A's 6 days work = 6/20 = 3/10. Remaining = 7/10. B's time = (7/10) × 30 = 21 days."
    },
    {
        id: 64,
        category: "Time & Work",
        difficulty: "Easy",
        question: "If 5 men can do a work in 10 days, how many men are needed to do it in 2 days?",
        options: { A: "15 men", B: "20 men", C: "25 men", D: "30 men" },
        answer: "C",
        solution: "5 × 10 = M × 2 → M = 25 men."
    },

    // ============================================================
    // PIPES & CISTERNS (65-68)
    // ============================================================
    {
        id: 65,
        category: "Pipes & Cisterns",
        difficulty: "Easy",
        question: "A pipe can fill a tank in 6 hours. What part of the tank does it fill in 1 hour?",
        options: { A: "1/3", B: "1/4", C: "1/5", D: "1/6" },
        answer: "D",
        solution: "In 1 hour, it fills 1/6 of the tank."
    },
    {
        id: 66,
        category: "Pipes & Cisterns",
        difficulty: "Medium",
        question: "Two pipes fill a tank in 12 and 16 hours respectively. How long will they take together?",
        options: { A: "6.8 hrs", B: "7.2 hrs", C: "7.6 hrs", D: "8 hrs" },
        answer: "A",
        solution: "1/12 + 1/16 = 7/48. Time = 48/7 = 6.86 ≈ 6.8 hours."
    },
    {
        id: 67,
        category: "Pipes & Cisterns",
        difficulty: "Hard",
        question: "A pipe fills a tank in 15 hours. Another pipe empties it in 20 hours. Both are opened. How long to fill it?",
        options: { A: "40 hrs", B: "50 hrs", C: "60 hrs", D: "70 hrs" },
        answer: "C",
        solution: "Net rate = 1/15 − 1/20 = 1/60. Time = 60 hours."
    },
    {
        id: 68,
        category: "Pipes & Cisterns",
        difficulty: "Medium",
        question: "Three pipes fill a tank in 6, 8, and 12 hours. How long do they take together?",
        options: { A: "2.4 hrs", B: "2.6 hrs", C: "2.8 hrs", D: "3 hrs" },
        answer: "B",
        solution: "1/6 + 1/8 + 1/12 = 9/24 = 3/8. Time = 8/3 = 2.67 ≈ 2.6 hours."
    },

    // ============================================================
    // TIME, SPEED & DISTANCE (69-74)
    // ============================================================
    {
        id: 69,
        category: "Time, Speed & Distance",
        difficulty: "Easy",
        question: "A car travels 180 km in 3 hours. What is its speed?",
        options: { A: "50 km/hr", B: "55 km/hr", C: "60 km/hr", D: "65 km/hr" },
        answer: "C",
        solution: "Speed = 180/3 = 60 km/hr."
    },
    {
        id: 70,
        category: "Time, Speed & Distance",
        difficulty: "Medium",
        question: "A train travels at 72 km/hr. What distance does it cover in 30 minutes?",
        options: { A: "30 km", B: "36 km", C: "40 km", D: "45 km" },
        answer: "B",
        solution: "Speed = 72 km/hr = 1.2 km/min. Distance = 1.2 × 30 = 36 km."
    },
    {
        id: 71,
        category: "Time, Speed & Distance",
        difficulty: "Hard",
        question: "A cyclist travels 24 km at 12 km/hr and 36 km at 18 km/hr. Find average speed.",
        options: { A: "14 km/hr", B: "15 km/hr", C: "16 km/hr", D: "17 km/hr" },
        answer: "B",
        solution: "Time 1 = 24/12 = 2 hrs. Time 2 = 36/18 = 2 hrs. Total = 60 km in 4 hrs. Average = 15 km/hr."
    },
    {
        id: 72,
        category: "Time, Speed & Distance",
        difficulty: "Medium",
        question: "A man walks 15 km in 2.5 hours. What is his speed?",
        options: { A: "4 km/hr", B: "5 km/hr", C: "6 km/hr", D: "7 km/hr" },
        answer: "C",
        solution: "Speed = 15/2.5 = 6 km/hr."
    },
    {
        id: 73,
        category: "Time, Speed & Distance",
        difficulty: "Hard",
        question: "A train 200 m long crosses a pole in 10 seconds. What is its speed?",
        options: { A: "60 km/hr", B: "65 km/hr", C: "70 km/hr", D: "72 km/hr" },
        answer: "D",
        solution: "Speed = 200/10 = 20 m/s = 20 × 18/5 = 72 km/hr."
    },
    {
        id: 74,
        category: "Time, Speed & Distance",
        difficulty: "Easy",
        question: "How long does it take to travel 100 km at 50 km/hr?",
        options: { A: "1 hr", B: "1.5 hrs", C: "2 hrs", D: "2.5 hrs" },
        answer: "C",
        solution: "Time = 100/50 = 2 hours."
    },

    // ============================================================
    // BOATS & STREAMS (75-78)
    // ============================================================
    {
        id: 75,
        category: "Boats & Streams",
        difficulty: "Medium",
        question: "A boat can travel 20 km in 4 hours downstream and 12 km in 4 hours upstream. Find speed of stream.",
        options: { A: "1 km/hr", B: "2 km/hr", C: "3 km/hr", D: "4 km/hr" },
        answer: "A",
        solution: "Downstream speed = 5 km/hr. Upstream speed = 3 km/hr. Stream speed = (5−3)/2 = 1 km/hr."
    },
    {
        id: 76,
        category: "Boats & Streams",
        difficulty: "Medium",
        question: "A boat's speed in still water is 15 km/hr and speed of stream is 3 km/hr. Find downstream speed.",
        options: { A: "16 km/hr", B: "18 km/hr", C: "20 km/hr", D: "21 km/hr" },
        answer: "B",
        solution: "Downstream speed = 15 + 3 = 18 km/hr."
    },
    {
        id: 77,
        category: "Boats & Streams",
        difficulty: "Hard",
        question: "A man can row upstream at 6 km/hr and downstream at 10 km/hr. Find speed in still water.",
        options: { A: "6 km/hr", B: "7 km/hr", C: "8 km/hr", D: "9 km/hr" },
        answer: "C",
        solution: "Speed in still water = (10 + 6)/2 = 8 km/hr."
    },
    {
        id: 78,
        category: "Boats & Streams",
        difficulty: "Hard",
        question: "If a boat takes 2 hours to go 30 km downstream and 5 hours to return, find the speed of the stream.",
        options: { A: "3 km/hr", B: "4 km/hr", C: "4.5 km/hr", D: "5 km/hr" },
        answer: "C",
        solution: "Downstream speed = 15 km/hr. Upstream speed = 6 km/hr. Stream speed = (15−6)/2 = 4.5 km/hr."
    },

    // ============================================================
    // PROBLEMS ON AGES (79-83)
    // ============================================================
    {
        id: 79,
        category: "Problems on Ages",
        difficulty: "Easy",
        question: "The sum of ages of a father and son is 60. If father is 3 times as old, find father's age.",
        options: { A: "40", B: "42", C: "45", D: "48" },
        answer: "C",
        solution: "Let son's age = x. Father = 3x. 4x = 60 → x = 15. Father = 45."
    },
    {
        id: 80,
        category: "Problems on Ages",
        difficulty: "Medium",
        question: "A is 5 years older than B. In 10 years, A will be twice as old as B. Find B's present age.",
        options: { A: "3", B: "4", C: "5", D: "6" },
        answer: "C",
        solution: "A = B + 5. (A + 10) = 2(B + 10) → B + 15 = 2B + 20 → B = 5."
    },
    {
        id: 81,
        category: "Problems on Ages",
        difficulty: "Hard",
        question: "The ratio of ages of P and Q is 4:5. After 5 years, ratio becomes 5:6. Find Q's present age.",
        options: { A: "18", B: "20", C: "22", D: "25" },
        answer: "D",
        solution: "P/Q = 4/5, (P+5)/(Q+5) = 5/6. Solving gives Q = 25."
    },
    {
        id: 82,
        category: "Problems on Ages",
        difficulty: "Medium",
        question: "A is 3 times as old as B. If the sum of their ages is 48, find B's age.",
        options: { A: "10", B: "12", C: "14", D: "16" },
        answer: "B",
        solution: "A = 3B, A + B = 48 → 4B = 48 → B = 12."
    },
    {
        id: 83,
        category: "Problems on Ages",
        difficulty: "Hard",
        question: "The average age of a family of 4 members is 30. The youngest is 20. What is the average of the other three?",
        options: { A: "32", B: "33", C: "33.33", D: "34" },
        answer: "C",
        solution: "Total = 120. Sum of other three = 100. Average = 100/3 = 33.33."
    },

    // ============================================================
    // MIXTURES & ALLEGATIONS (84-87)
    // ============================================================
    {
        id: 84,
        category: "Mixtures & Allegations",
        difficulty: "Medium",
        question: "A 20% salt solution is mixed with a 50% salt solution to get 30% solution. What is the ratio?",
        options: { A: "1:2", B: "2:1", C: "2:3", D: "3:2" },
        answer: "B",
        solution: "Using allegation: 20% solution : 50% solution = (50−30):(30−20) = 20:10 = 2:1."
    },
    {
        id: 85,
        category: "Mixtures & Allegations",
        difficulty: "Hard",
        question: "A 10L solution has 30% acid. How much water should be added to make it 20% acid?",
        options: { A: "2 L", B: "3 L", C: "4 L", D: "5 L" },
        answer: "D",
        solution: "Acid = 3L. New solution = 3/0.20 = 15L. Water to add = 15 − 10 = 5L."
    },
    {
        id: 86,
        category: "Mixtures & Allegations",
        difficulty: "Medium",
        question: "Two liquids in ratio 2:3 are mixed to get 50L. Find quantity of each.",
        options: { A: "18,32", B: "20,30", C: "22,28", D: "25,25" },
        answer: "B",
        solution: "Sum of parts = 5. First = (2/5) × 50 = 20L. Second = (3/5) × 50 = 30L."
    },
    {
        id: 87,
        category: "Mixtures & Allegations",
        difficulty: "Hard",
        question: "A 40% alcohol solution and a 60% alcohol solution are mixed to get 45% solution in 50L. Find quantity of 40% solution.",
        options: { A: "30 L", B: "35 L", C: "37.5 L", D: "40 L" },
        answer: "C",
        solution: "Using allegation: 40% : 60% = (60−45):(45−40) = 15:5 = 3:1. 40% solution = (3/4) × 50 = 37.5L."
    },

    // ============================================================
    // PARTNERSHIP (88-91)
    // ============================================================
    {
        id: 88,
        category: "Partnership",
        difficulty: "Easy",
        question: "A and B invest $1000 and $1500 respectively. If profit is $500, find A's share.",
        options: { A: "$180", B: "$200", C: "$220", D: "$250" },
        answer: "B",
        solution: "Ratio = 1000:1500 = 2:3. A's share = (2/5) × 500 = 200."
    },
    {
        id: 89,
        category: "Partnership",
        difficulty: "Medium",
        question: "A invests $2000 for 6 months and B invests $3000 for 4 months. If profit is $2400, find A's share.",
        options: { A: "$1000", B: "$1100", C: "$1200", D: "$1300" },
        answer: "C",
        solution: "A's capital = 2000 × 6 = 12000. B's = 3000 × 4 = 12000. Ratio = 1:1. A's share = 1200."
    },
    {
        id: 90,
        category: "Partnership",
        difficulty: "Hard",
        question: "A, B, C invest in ratio 2:3:4. Total profit is $3600. Find C's share.",
        options: { A: "$1200", B: "$1400", C: "$1600", D: "$1800" },
        answer: "C",
        solution: "Sum = 9. C's share = (4/9) × 3600 = 1600."
    },
    {
        id: 91,
        category: "Partnership",
        difficulty: "Medium",
        question: "A and B start a business with capital $5000 and $8000. After 6 months, C joins with $6000. Total profit $3400 in 1 year. Find B's share.",
        options: { A: "$1200", B: "$1400", C: "$1600", D: "$1800" },
        answer: "C",
        solution: "A = 5000 × 12 = 60000. B = 8000 × 12 = 96000. C = 6000 × 6 = 36000. Ratio = 10:16:6 = 5:8:3. B's share = (8/16) × 3400 = 1700."
    },

    // ============================================================
    // PROBABILITY (92-95)
    // ============================================================
    {
        id: 92,
        category: "Probability",
        difficulty: "Easy",
        question: "A fair coin is tossed. What is the probability of getting heads?",
        options: { A: "1/4", B: "1/3", C: "1/2", D: "2/3" },
        answer: "C",
        solution: "Total outcomes = 2 (H,T). Favorable = 1 (H). Probability = 1/2."
    },
    {
        id: 93,
        category: "Probability",
        difficulty: "Medium",
        question: "A bag has 5 red balls and 3 blue balls. What is the probability of picking a red ball?",
        options: { A: "3/8", B: "5/8", C: "4/8", D: "6/8" },
        answer: "B",
        solution: "Total balls = 8. Red balls = 5. Probability = 5/8."
    },
    {
        id: 94,
        category: "Probability",
        difficulty: "Hard",
        question: "Two dice are rolled. What is the probability of getting sum 7?",
        options: { A: "1/6", B: "1/8", C: "1/9", D: "1/12" },
        answer: "A",
        solution: "Total outcomes = 36. Favorable outcomes = 6 (1+6,2+5,3+4,4+3,5+2,6+1). Probability = 6/36 = 1/6."
    },
    {
        id: 95,
        category: "Probability",
        difficulty: "Medium",
        question: "A card is drawn from a pack of 52. What is the probability of getting an ace?",
        options: { A: "1/13", B: "1/12", C: "1/11", D: "1/10" },
        answer: "A",
        solution: "Aces in a deck = 4. Probability = 4/52 = 1/13."
    },

    // ============================================================
    // PERMUTATION & COMBINATION (96-100)
    // ============================================================
    {
        id: 96,
        category: "Permutation & Combination",
        difficulty: "Medium",
        question: "In how many ways can 3 books be arranged on a shelf?",
        options: { A: "3", B: "4", C: "5", D: "6" },
        answer: "D",
        solution: "3! = 3 × 2 × 1 = 6."
    },
    {
        id: 97,
        category: "Permutation & Combination",
        difficulty: "Hard",
        question: "How many 3-digit numbers can be formed using 1,2,3,4 without repetition?",
        options: { A: "12", B: "18", C: "24", D: "30" },
        answer: "C",
        solution: "P(4,3) = 4!/(4−3)! = 24."
    },
    {
        id: 98,
        category: "Permutation & Combination",
        difficulty: "Medium",
        question: "In how many ways can 5 members be selected from 8?",
        options: { A: "42", B: "48", C: "56", D: "64" },
        answer: "C",
        solution: "C(8,5) = 8!/(5! × 3!) = 56."
    },
    {
        id: 99,
        category: "Permutation & Combination",
        difficulty: "Hard",
        question: "How many ways can 4 boys and 3 girls be arranged in a row if girls sit together?",
        options: { A: "120", B: "240", C: "360", D: "720" },
        answer: "D",
        solution: "Consider girls as one unit. Total units = 5. Arrangements = 5! × 3! = 120 × 6 = 720."
    },
    {
        id: 100,
        category: "Permutation & Combination",
        difficulty: "Easy",
        question: "How many ways can 2 letters be chosen from 4 letters?",
        options: { A: "4", B: "6", C: "8", D: "10" },
        answer: "B",
        solution: "C(4,2) = 4!/(2! × 2!) = 6."
    },

    // ============================================================
    // ALGEBRA (101-105)
    // ============================================================
    {
        id: 101,
        category: "Algebra",
        difficulty: "Easy",
        question: "Simplify: 2x + 3x − 5 = 20. Find x.",
        options: { A: "3", B: "4", C: "5", D: "6" },
        answer: "C",
        solution: "5x − 5 = 20 → 5x = 25 → x = 5."
    },
    {
        id: 102,
        category: "Algebra",
        difficulty: "Medium",
        question: "If x² = 64, find x.",
        options: { A: "±4", B: "±8", C: "±16", D: "±32" },
        answer: "B",
        solution: "x = ±√64 = ±8."
    },
    {
        id: 103,
        category: "Algebra",
        difficulty: "Hard",
        question: "Solve: 2x/3 + 4 = 10.",
        options: { A: "6", B: "8", C: "9", D: "12" },
        answer: "C",
        solution: "2x/3 = 6 → 2x = 18 → x = 9."
    },
    {
        id: 104,
        category: "Algebra",
        difficulty: "Medium",
        question: "If 3x − 7 = 2x + 5, find x.",
        options: { A: "10", B: "11", C: "12", D: "13" },
        answer: "C",
        solution: "3x − 2x = 5 + 7 → x = 12."
    },
    {
        id: 105,
        category: "Algebra",
        difficulty: "Hard",
        question: "Factorize: x² − 9.",
        options: { A: "(x−3)(x−3)", B: "(x+3)(x−3)", C: "(x+9)(x−1)", D: "(x−9)(x+1)" },
        answer: "B",
        solution: "x² − 9 = x² − 3² = (x+3)(x−3)."
    },

    // ============================================================
    // MENSURATION (106-110)
    // ============================================================
    {
        id: 106,
        category: "Mensuration",
        difficulty: "Easy",
        question: "Find the area of a square of side 8 cm.",
        options: { A: "32 cm²", B: "48 cm²", C: "64 cm²", D: "72 cm²" },
        answer: "C",
        solution: "Area = side² = 8² = 64 cm²."
    },
    {
        id: 107,
        category: "Mensuration",
        difficulty: "Medium",
        question: "Find the perimeter of a rectangle 12m by 8m.",
        options: { A: "30 m", B: "35 m", C: "40 m", D: "45 m" },
        answer: "C",
        solution: "Perimeter = 2(12+8) = 40 m."
    },
    {
        id: 108,
        category: "Mensuration",
        difficulty: "Hard",
        question: "Find the volume of a cylinder radius 7cm, height 10cm. (π=22/7)",
        options: { A: "1540 cm³", B: "1640 cm³", C: "1740 cm³", D: "1840 cm³" },
        answer: "A",
        solution: "Volume = πr²h = (22/7) × 49 × 10 = 1540 cm³."
    },
    {
        id: 109,
        category: "Mensuration",
        difficulty: "Medium",
        question: "Find the area of a circle with radius 7cm. (π=22/7)",
        options: { A: "144 cm²", B: "154 cm²", C: "164 cm²", D: "174 cm²" },
        answer: "B",
        solution: "Area = πr² = (22/7) × 49 = 154 cm²."
    },
    {
        id: 110,
        category: "Mensuration",
        difficulty: "Hard",
        question: "A triangle has base 10cm and height 8cm. Find its area.",
        options: { A: "30 cm²", B: "35 cm²", C: "40 cm²", D: "45 cm²" },
        answer: "C",
        solution: "Area = (1/2) × base × height = (1/2) × 10 × 8 = 40 cm²."
    },

    // ============================================================
    // LOGICAL REASONING - Number Series (111-115)
    // ============================================================
    {
        id: 111,
        category: "Number Series",
        difficulty: "Easy",
        question: "What is the next number: 2, 5, 8, 11, __?",
        options: { A: "12", B: "13", C: "14", D: "15" },
        answer: "C",
        solution: "Arithmetic progression with difference 3. Next = 11 + 3 = 14."
    },
    {
        id: 112,
        category: "Number Series",
        difficulty: "Medium",
        question: "Find the next number: 3, 9, 27, 81, __?",
        options: { A: "162", B: "190", C: "216", D: "243" },
        answer: "D",
        solution: "Each term is multiplied by 3. Next = 81 × 3 = 243."
    },
    {
        id: 113,
        category: "Number Series",
        difficulty: "Hard",
        question: "What comes next: 1, 4, 9, 16, 25, __?",
        options: { A: "30", B: "32", C: "35", D: "36" },
        answer: "D",
        solution: "Squares of natural numbers: 1²,2²,3²,4²,5². Next = 6² = 36."
    },
    {
        id: 114,
        category: "Number Series",
        difficulty: "Medium",
        question: "Find the missing number: 2, 6, 12, 20, 30, __?",
        options: { A: "36", B: "38", C: "40", D: "42" },
        answer: "D",
        solution: "n² + n: 1×2,2×3,3×4,4×5,5×6. Next = 6×7 = 42."
    },
    {
        id: 115,
        category: "Number Series",
        difficulty: "Hard",
        question: "What is the next number: 5, 8, 13, 21, __?",
        options: { A: "30", B: "32", C: "34", D: "36" },
        answer: "C",
        solution: "Fibonacci pattern: 5+8=13, 8+13=21. Next = 13+21 = 34."
    },

    // ============================================================
    // ALPHABET SERIES (116-118)
    // ============================================================
    {
        id: 116,
        category: "Alphabet Series",
        difficulty: "Easy",
        question: "What comes next: A, C, E, G, __?",
        options: { A: "H", B: "I", C: "J", D: "K" },
        answer: "B",
        solution: "Alphabet position increases by 2: 1,3,5,7. Next = 9 = I."
    },
    {
        id: 117,
        category: "Alphabet Series",
        difficulty: "Medium",
        question: "Find the next letter: Z, X, V, T, __?",
        options: { A: "P", B: "Q", C: "R", D: "S" },
        answer: "C",
        solution: "Decreasing by 2: 26,24,22,20. Next = 18 = R."
    },
    {
        id: 118,
        category: "Alphabet Series",
        difficulty: "Hard",
        question: "What comes next: B, D, G, K, __?",
        options: { A: "N", B: "O", C: "P", D: "Q" },
        answer: "C",
        solution: "Differences increase: +2,+3,+4. Next = K + 5 = P."
    },

    // ============================================================
    // CODING-DECODING (119-123)
    // ============================================================
    {
        id: 119,
        category: "Coding-Decoding",
        difficulty: "Easy",
        question: "If DOG is coded as 4-15-7, what is CAT?",
        options: { A: "2-1-20", B: "3-1-20", C: "3-2-20", D: "2-3-20" },
        answer: "B",
        solution: "Letters are coded by their alphabet positions: C=3, A=1, T=20."
    },
    {
        id: 120,
        category: "Coding-Decoding",
        difficulty: "Medium",
        question: "If CODE is 3-15-4-5, what is FISH?",
        options: { A: "6-9-19-8", B: "6-9-19-7", C: "5-9-19-8", D: "6-10-19-8" },
        answer: "A",
        solution: "F=6, I=9, S=19, H=8."
    },
    {
        id: 121,
        category: "Coding-Decoding",
        difficulty: "Hard",
        question: "If 'CERTAIN' is 'XVIGZRM', what is 'SECURE'?",
        options: { A: "HVXFIV", B: "HVXFIW", C: "HWXFIV", D: "HVXGIV" },
        answer: "A",
        solution: "Each letter is reversed in alphabet (A↔Z). SECURE → HVXFIV."
    },
    {
        id: 122,
        category: "Coding-Decoding",
        difficulty: "Medium",
        question: "If 'A' is 1, 'B' is 2, what is 'SUM'?",
        options: { A: "19-21-13", B: "19-21-12", C: "18-21-13", D: "19-20-13" },
        answer: "A",
        solution: "S=19, U=21, M=13."
    },
    {
        id: 123,
        category: "Coding-Decoding",
        difficulty: "Hard",
        question: "If 'BAT' is coded as 'YAX', what is 'CAT'?",
        options: { A: "YAX", B: "YAZ", C: "XAZ", D: "XAY" },
        answer: "C",
        solution: "Each letter is replaced by the letter 2 positions before: C→X, A→A, T→Z."
    },

    // ============================================================
    // BLOOD RELATIONS (124-127)
    // ============================================================
    {
        id: 124,
        category: "Blood Relations",
        difficulty: "Easy",
        question: "A is the father of B, B is the sister of C. What is A to C?",
        options: { A: "Uncle", B: "Father", C: "Mother", D: "Grandfather" },
        answer: "B",
        solution: "A is father of B and C is sibling of B, so A is father of C."
    },
    {
        id: 125,
        category: "Blood Relations",
        difficulty: "Medium",
        question: "A is B's brother. C is B's mother. What is A to C?",
        options: { A: "Son", B: "Brother", C: "Nephew", D: "Grandson" },
        answer: "A",
        solution: "A is brother of B, C is mother of B, so A is son of C."
    },
    {
        id: 126,
        category: "Blood Relations",
        difficulty: "Hard",
        question: "A is B's father. C is B's daughter. What is A to C?",
        options: { A: "Father", B: "Grandfather", C: "Brother", D: "Uncle" },
        answer: "B",
        solution: "A is father of B, C is daughter of B, so A is grandfather of C."
    },
    {
        id: 127,
        category: "Blood Relations",
        difficulty: "Medium",
        question: "A is B's sister. C is A's mother. What is C to B?",
        options: { A: "Mother", B: "Aunt", C: "Grandmother", D: "Sister" },
        answer: "A",
        solution: "A and B are siblings, C is mother of A, so C is also mother of B."
    },

    // ============================================================
    // DIRECTION SENSE (128-132)
    // ============================================================
    {
        id: 128,
        category: "Direction Sense",
        difficulty: "Easy",
        question: "If a person walks 10 km north, then turns right and walks 10 km. Where is he from start?",
        options: { A: "South-East", B: "North-East", C: "South-West", D: "North-West" },
        answer: "B",
        solution: "North then East = North-East."
    },
    {
        id: 129,
        category: "Direction Sense",
        difficulty: "Medium",
        question: "A person walks south 5 km, then west 5 km. What is his distance from start?",
        options: { A: "5 km", B: "5√2 km", C: "10 km", D: "12 km" },
        answer: "B",
        solution: "Using Pythagoras: √(5²+5²) = 5√2 km."
    },
    {
        id: 130,
        category: "Direction Sense",
        difficulty: "Hard",
        question: "A man walks 3 km north, turns right 4 km, then left 2 km. Where is he?",
        options: { A: "North-East", B: "North-West", C: "South-East", D: "South-West" },
        answer: "A",
        solution: "Net North = 3+2 = 5 km, East = 4 km. Direction = North-East."
    },
    {
        id: 131,
        category: "Direction Sense",
        difficulty: "Medium",
        question: "If I face East and turn 135° clockwise, what direction do I face?",
        options: { A: "North-East", B: "South-West", C: "South-East", D: "North-West" },
        answer: "B",
        solution: "East → 90° → South, +45° more = South-West."
    },
    {
        id: 132,
        category: "Direction Sense",
        difficulty: "Hard",
        question: "A person goes 5 km North, then 12 km East. What is the shortest distance to start?",
        options: { A: "10 km", B: "12 km", C: "13 km", D: "15 km" },
        answer: "C",
        solution: "Pythagoras: √(5²+12²) = √169 = 13 km."
    },

    // ============================================================
    // ANALOGY (133-136)
    // ============================================================
    {
        id: 133,
        category: "Analogy",
        difficulty: "Easy",
        question: "Dog is to Puppy as Cat is to __?",
        options: { A: "Kitten", B: "Cub", C: "Foal", D: "Calf" },
        answer: "A",
        solution: "Young of dog is puppy, young of cat is kitten."
    },
    {
        id: 134,
        category: "Analogy",
        difficulty: "Medium",
        question: "Square is to 4 as Triangle is to __?",
        options: { A: "2", B: "3", C: "4", D: "5" },
        answer: "B",
        solution: "Square has 4 sides, triangle has 3 sides."
    },
    {
        id: 135,
        category: "Analogy",
        difficulty: "Hard",
        question: "Cuboid is to 12 as Cube is to __?",
        options: { A: "6", B: "8", C: "12", D: "24" },
        answer: "C",
        solution: "Cuboid has 12 edges, cube also has 12 edges."
    },
    {
        id: 136,
        category: "Analogy",
        difficulty: "Medium",
        question: "Earth is to Planet as Sun is to __?",
        options: { A: "Star", B: "Moon", C: "Planet", D: "Galaxy" },
        answer: "A",
        solution: "Earth is a planet, Sun is a star."
    },

    // ============================================================
    // CLASSIFICATION / ODD ONE OUT (137-140)
    // ============================================================
    {
        id: 137,
        category: "Odd One Out",
        difficulty: "Easy",
        question: "Which is odd: Apple, Orange, Mango, Carrot?",
        options: { A: "Apple", B: "Orange", C: "Mango", D: "Carrot" },
        answer: "D",
        solution: "Carrot is a vegetable, others are fruits."
    },
    {
        id: 138,
        category: "Odd One Out",
        difficulty: "Medium",
        question: "Which is odd: 2, 4, 8, 9?",
        options: { A: "2", B: "4", C: "8", D: "9" },
        answer: "D",
        solution: "9 is odd, others are even."
    },
    {
        id: 139,
        category: "Odd One Out",
        difficulty: "Hard",
        question: "Which is odd: Circle, Square, Triangle, Sphere?",
        options: { A: "Circle", B: "Square", C: "Triangle", D: "Sphere" },
        answer: "D",
        solution: "Sphere is 3D, others are 2D shapes."
    },
    {
        id: 140,
        category: "Odd One Out",
        difficulty: "Medium",
        question: "Which is odd: Gold, Silver, Copper, Wood?",
        options: { A: "Gold", B: "Silver", C: "Copper", D: "Wood" },
        answer: "D",
        solution: "Wood is non-metal, others are metals."
    },

    // ============================================================
    // SYLLOGISM (141-144)
    // ============================================================
    {
        id: 141,
        category: "Syllogism",
        difficulty: "Easy",
        question: "All dogs are animals. Some animals are pets. Can we conclude some dogs are pets?",
        options: { A: "Yes", B: "No", C: "Maybe", D: "Cannot determine" },
        answer: "D",
        solution: "Cannot determine as pet animals might or might not include dogs."
    },
    {
        id: 142,
        category: "Syllogism",
        difficulty: "Medium",
        question: "All birds have wings. Parrot is a bird. What can we conclude?",
        options: { A: "Parrot flies", B: "Parrot has wings", C: "All birds fly", D: "No conclusion" },
        answer: "B",
        solution: "Parrot is a bird, so it has wings."
    },
    {
        id: 143,
        category: "Syllogism",
        difficulty: "Hard",
        question: "Some students are tall. All tall people are athletes. What can we conclude?",
        options: { A: "All students are athletes", B: "Some students are athletes", C: "All athletes are tall", D: "No conclusion" },
        answer: "B",
        solution: "Some students are tall, and all tall are athletes, so some students are athletes."
    },
    {
        id: 144,
        category: "Syllogism",
        difficulty: "Medium",
        question: "No cats are dogs. All dogs are animals. What can we conclude?",
        options: { A: "Some cats are animals", B: "No cats are animals", C: "Some dogs are cats", D: "No conclusion" },
        answer: "D",
        solution: "Cannot conclude anything about cats and animals from the given statements."
    },

    // ============================================================
    // STATEMENT & CONCLUSION (145-148)
    // ============================================================
    {
        id: 145,
        category: "Statement & Conclusion",
        difficulty: "Easy",
        question: "Statement: 'All roses are flowers.' Conclusion: 'Some flowers are roses.'",
        options: { A: "True", B: "False", C: "Uncertain", D: "Invalid" },
        answer: "A",
        solution: "If all roses are flowers, then some flowers are definitely roses."
    },
    {
        id: 146,
        category: "Statement & Conclusion",
        difficulty: "Medium",
        question: "Statement: 'No pen is a pencil.' Conclusion: 'Some pencils are not pens.'",
        options: { A: "True", B: "False", C: "Uncertain", D: "Invalid" },
        answer: "A",
        solution: "If no pen is a pencil, then some pencils are definitely not pens."
    },
    {
        id: 147,
        category: "Statement & Conclusion",
        difficulty: "Hard",
        question: "Statement: 'All good students study hard.' Conclusion: 'Some who study hard are good students.'",
        options: { A: "True", B: "False", C: "Uncertain", D: "Invalid" },
        answer: "A",
        solution: "If all good students study hard, then those who study hard must include good students."
    },
    {
        id: 148,
        category: "Statement & Conclusion",
        difficulty: "Medium",
        question: "Statement: 'Some cats are black.' Conclusion: 'All black things are cats.'",
        options: { A: "True", B: "False", C: "Uncertain", D: "Invalid" },
        answer: "B",
        solution: "Some cats being black doesn't mean all black things are cats."
    },

    // ============================================================
    // SEATING ARRANGEMENT (149-152)
    // ============================================================
    {
        id: 149,
        category: "Seating Arrangement",
        difficulty: "Easy",
        question: "In a row of 5, A is in the middle. B is to the right of C. Who is at position 3?",
        options: { A: "A", B: "B", C: "C", D: "Cannot determine" },
        answer: "A",
        solution: "Middle position in a row of 5 is position 3. A is in the middle."
    },
    {
        id: 150,
        category: "Seating Arrangement",
        difficulty: "Medium",
        question: "A, B, C, D sit in a row. A is at left end, D is at right end. B sits between C and A. Find the order.",
        options: { A: "A-B-C-D", B: "A-C-B-D", C: "A-B-D-C", D: "D-B-C-A" },
        answer: "A",
        solution: "A at left, D at right, B between C and A means order is A-B-C-D."
    },
    {
        id: 151,
        category: "Seating Arrangement",
        difficulty: "Hard",
        question: "Six people sit in a circle. A sits opposite B. C sits between D and E. F is to the left of A. Who is opposite D?",
        options: { A: "B", B: "C", C: "E", D: "Cannot determine" },
        answer: "D",
        solution: "Multiple arrangements possible, cannot determine without more information."
    },
    {
        id: 152,
        category: "Seating Arrangement",
        difficulty: "Medium",
        question: "A, B, C, D, E sit in a row. A and E are at ends. B sits next to A. D sits next to E. Who sits in middle?",
        options: { A: "A", B: "B", C: "C", D: "D" },
        answer: "C",
        solution: "A at left, E at right. B next to A, D next to E. Middle is C."
    },

    // ============================================================
    // LOGICAL PUZZLES (153-156)
    // ============================================================
    {
        id: 153,
        category: "Logical Puzzles",
        difficulty: "Easy",
        question: "What is the next number: 1, 3, 6, 10, 15, __?",
        options: { A: "18", B: "20", C: "21", D: "25" },
        answer: "C",
        solution: "Triangular numbers: +2,+3,+4,+5,+6. 15+6=21."
    },
    {
        id: 154,
        category: "Logical Puzzles",
        difficulty: "Medium",
        question: "If 2+3=10, 3+4=21, 4+5=36, what is 5+6=?",
        options: { A: "45", B: "55", C: "56", D: "65" },
        answer: "B",
        solution: "a+b = a×b + a = 5×6+5 = 35, but pattern is a×b+a? Let's check: 2+3=2×3+4=10, 3+4=3×4+9=21, 4+5=4×5+16=36. Formula a×b+a² = 5×6+25=55."
    },
    {
        id: 155,
        category: "Logical Puzzles",
        difficulty: "Hard",
        question: "What is the missing number: 8, 15, 24, 35, __?",
        options: { A: "46", B: "47", C: "48", D: "49" },
        answer: "C",
        solution: "Differences: +7,+9,+11,+13. 35+13=48."
    },
    {
        id: 156,
        category: "Logical Puzzles",
        difficulty: "Medium",
        question: "If 3, 8, 15, 24, 35 follows a pattern, what is next?",
        options: { A: "44", B: "45", C: "46", D: "48" },
        answer: "D",
        solution: "n²+2n: 1²+2=3, 2²+4=8, 3²+6=15, 4²+8=24, 5²+10=35. Next = 6²+12=48."
    },

    // ============================================================
    // DATA INTERPRETATION - Tables (157-162)
    // ============================================================
    {
        id: 157,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A table shows sales: Jan=100, Feb=120, Mar=140. What is total sales?",
        options: { A: "320", B: "340", C: "350", D: "360" },
        answer: "D",
        solution: "100 + 120 + 140 = 360."
    },
    {
        id: 158,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "In a class, 40 students passed, 10 failed. What is pass percentage?",
        options: { A: "75%", B: "80%", C: "85%", D: "90%" },
        answer: "B",
        solution: "Total = 50. Pass % = (40/50) × 100 = 80%."
    },
    {
        id: 159,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A company has 200 employees: 120 men, 80 women. 60% of men and 50% of women are graduates. How many graduates total?",
        options: { A: "102", B: "104", C: "106", D: "108" },
        answer: "D",
        solution: "Men graduates = 120 × 0.6 = 72. Women graduates = 80 × 0.5 = 40. Total = 112."
    },
    {
        id: 160,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A shop sold items: Day 1: 50, Day 2: 60, Day 3: 55, Day 4: 75. What is average daily sales?",
        options: { A: "55", B: "58", C: "60", D: "62" },
        answer: "C",
        solution: "Total = 50+60+55+75 = 240. Average = 240/4 = 60."
    },
    {
        id: 161,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "In a survey, 40% like tea, 60% like coffee. If 20% like both, what percentage like neither?",
        options: { A: "10%", B: "15%", C: "20%", D: "25%" },
        answer: "C",
        solution: "Like at least one = 40+60−20 = 80%. Neither = 20%."
    },
    {
        id: 162,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A table shows: Product A: 100 units, Product B: 150 units. What is ratio of A:B?",
        options: { A: "1:2", B: "2:3", C: "3:4", D: "4:5" },
        answer: "B",
        solution: "100:150 = 2:3."
    },

    // ============================================================
    // BAR CHARTS (163-166)
    // ============================================================
    {
        id: 163,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A bar chart shows scores: Math=80, Science=70, English=90. What is total score?",
        options: { A: "220", B: "230", C: "240", D: "250" },
        answer: "C",
        solution: "80 + 70 + 90 = 240."
    },
    {
        id: 164,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A bar chart shows sales: Q1=200, Q2=240, Q3=260, Q4=300. What is the increase from Q1 to Q4?",
        options: { A: "40%", B: "45%", C: "50%", D: "55%" },
        answer: "C",
        solution: "Increase = 300−200 = 100. % = (100/200) × 100 = 50%."
    },
    {
        id: 165,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A bar chart shows profits: Year 1: 120, Year 2: 150, Year 3: 180. What is average profit?",
        options: { A: "140", B: "145", C: "150", D: "155" },
        answer: "C",
        solution: "Total = 120+150+180 = 450. Average = 450/3 = 150."
    },
    {
        id: 166,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A bar chart shows students: Boys=150, Girls=100. What is percentage of girls?",
        options: { A: "30%", B: "35%", C: "40%", D: "45%" },
        answer: "C",
        solution: "Total = 250. Girls % = (100/250) × 100 = 40%."
    },

    // ============================================================
    // PIE CHARTS (167-170)
    // ============================================================
    {
        id: 167,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A pie chart shows: A=30%, B=25%, C=45%. What is A's share of 200?",
        options: { A: "40", B: "50", C: "55", D: "60" },
        answer: "D",
        solution: "30% of 200 = 60."
    },
    {
        id: 168,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A pie chart has 3 sectors: 120°, 90°, 150°. What percentage is the largest?",
        options: { A: "30%", B: "35%", C: "40%", D: "42%" },
        answer: "D",
        solution: "Largest = 150°. Percentage = (150/360) × 100 = 41.67% ≈ 42%."
    },
    {
        id: 169,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A pie chart shows budget: Education=25%, Health=30%, Defence=20%, Others=25%. If total is $8000, how much is spent on Health?",
        options: { A: "$2000", B: "$2200", C: "$2400", D: "$2600" },
        answer: "C",
        solution: "30% of 8000 = 2400."
    },
    {
        id: 170,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A pie chart shows: Sales=40%, Marketing=25%, R&D=20%, Admin=15%. If total is 500, what is Marketing's share?",
        options: { A: "100", B: "120", C: "125", D: "130" },
        answer: "C",
        solution: "25% of 500 = 125."
    },

    // ============================================================
    // LINE CHARTS (171-174)
    // ============================================================
    {
        id: 171,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A line chart shows temperature: 20°, 25°, 30°, 35°. What is the trend?",
        options: { A: "Increasing", B: "Decreasing", C: "Stable", D: "Fluctuating" },
        answer: "A",
        solution: "Values increase from 20 to 35."
    },
    {
        id: 172,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A line chart shows sales: Jan=100, Feb=120, Mar=110, Apr=130. What is highest sales month?",
        options: { A: "Jan", B: "Feb", C: "Mar", D: "Apr" },
        answer: "D",
        solution: "April has 130, which is highest."
    },
    {
        id: 173,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A line chart shows stock prices: Mon=50, Tue=55, Wed=48, Thu=52, Fri=60. What is average price?",
        options: { A: "50", B: "52", C: "53", D: "55" },
        answer: "C",
        solution: "Total = 265. Average = 265/5 = 53."
    },
    {
        id: 174,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A line chart shows: Year 1=100, Year 2=120, Year 3=140, Year 4=160. What is the growth rate from Year 1 to Year 4?",
        options: { A: "40%", B: "50%", C: "60%", D: "70%" },
        answer: "C",
        solution: "Increase = 60. % = (60/100) × 100 = 60%."
    },

    // ============================================================
    // BUSINESS / RECRUITMENT DATA (175-180)
    // ============================================================
    {
        id: 175,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A company has 500 applicants. 300 are shortlisted. What is the shortlisting percentage?",
        options: { A: "50%", B: "55%", C: "60%", D: "65%" },
        answer: "C",
        solution: "(300/500) × 100 = 60%."
    },
    {
        id: 176,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "An IT company had 200 employees in 2020, 240 in 2021, 280 in 2022. What is the growth percentage from 2020 to 2022?",
        options: { A: "30%", B: "35%", C: "40%", D: "45%" },
        answer: "C",
        solution: "Increase = 80. % = (80/200) × 100 = 40%."
    },
    {
        id: 177,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A recruitment drive: 40% of applicants are from IT, 30% from Finance, 20% from HR, 10% from Others. If total applicants are 800, how many are from IT?",
        options: { A: "280", B: "300", C: "320", D: "340" },
        answer: "C",
        solution: "40% of 800 = 320."
    },
    {
        id: 178,
        category: "Data Interpretation",
        difficulty: "Medium",
        question: "A survey shows 60% of candidates prefer online tests, 40% prefer offline. If 150 candidates prefer online, how many total?",
        options: { A: "200", B: "220", C: "240", D: "250" },
        answer: "D",
        solution: "60% = 150, so total = 150/0.6 = 250."
    },
    {
        id: 179,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A company hires 50 candidates. The ratio of male to female hires is 3:2. How many female hires?",
        options: { A: "15", B: "18", C: "20", D: "22" },
        answer: "C",
        solution: "Sum = 5. Female = (2/5) × 50 = 20."
    },
    {
        id: 180,
        category: "Data Interpretation",
        difficulty: "Easy",
        question: "A test has 100 candidates. 85 passed. What is the failure percentage?",
        options: { A: "10%", B: "12%", C: "15%", D: "18%" },
        answer: "C",
        solution: "Failed = 15. % = (15/100) × 100 = 15%."
    },

    // ============================================================
    // ADDITIONAL ORIGINAL QUESTIONS (181-200)
    // ============================================================
    {
        id: 181,
        category: "Number System",
        difficulty: "Medium",
        question: "What is the value of (256)^(1/4)?",
        options: { A: "2", B: "3", C: "4", D: "5" },
        answer: "C",
        solution: "4^4 = 256, so (256)^(1/4) = 4."
    },
    {
        id: 182,
        category: "Percentages",
        difficulty: "Hard",
        question: "A number is increased by 20% and then decreased by 20%. What is the net change?",
        options: { A: "0%", B: "2% decrease", C: "4% decrease", D: "2% increase" },
        answer: "C",
        solution: "100 → 120 → 96. Net decrease = 4%."
    },
    {
        id: 183,
        category: "Profit & Loss",
        difficulty: "Hard",
        question: "A shopkeeper sells at 10% profit. If cost price is $200, what is the selling price?",
        options: { A: "$210", B: "$215", C: "$220", D: "$225" },
        answer: "C",
        solution: "Profit = 10% of 200 = 20. SP = 220."
    },
    {
        id: 184,
        category: "Ratio & Proportion",
        difficulty: "Hard",
        question: "If a:b = 3:5 and b:c = 10:7, find a:b:c.",
        options: { A: "6:10:7", B: "3:5:7", C: "6:10:14", D: "3:10:7" },
        answer: "A",
        solution: "a:b = 3:5 = 6:10, b:c = 10:7 → a:b:c = 6:10:7."
    },
    {
        id: 185,
        category: "Average",
        difficulty: "Hard",
        question: "The average of 5 numbers is 20. If one number is added, average becomes 22. What is the new number?",
        options: { A: "28", B: "30", C: "32", D: "34" },
        answer: "C",
        solution: "Sum of 5 = 100. Sum of 6 = 132. New number = 32."
    },
    {
        id: 186,
        category: "Simple Interest",
        difficulty: "Hard",
        question: "A sum of money doubles in 5 years at simple interest. What is the rate?",
        options: { A: "15%", B: "18%", C: "20%", D: "25%" },
        answer: "C",
        solution: "SI = P, R = (SI×100)/(P×T) = 100/5 = 20%."
    },
    {
        id: 187,
        category: "Time & Work",
        difficulty: "Hard",
        question: "A can do a work in 10 days, B in 15 days. They work together for 3 days. How much work is left?",
        options: { A: "1/2", B: "1/3", C: "1/4", D: "1/5" },
        answer: "A",
        solution: "Combined rate = 1/10+1/15=1/6. In 3 days = 1/2 work done. Work left = 1/2."
    },
    {
        id: 188,
        category: "Time, Speed & Distance",
        difficulty: "Hard",
        question: "Two trains start at 10 AM from stations 300 km apart. Speed 60 km/hr and 40 km/hr. When do they meet?",
        options: { A: "11 AM", B: "12 PM", C: "1 PM", D: "2 PM" },
        answer: "C",
        solution: "Relative speed = 100 km/hr. Time = 300/100 = 3 hrs. Meet at 1 PM."
    },
    {
        id: 189,
        category: "Probability",
        difficulty: "Hard",
        question: "A bag has 4 white, 3 black balls. Two balls are drawn. What is the probability both are white?",
        options: { A: "2/7", B: "3/7", C: "4/7", D: "6/7" },
        answer: "A",
        solution: "Total = 7. First white = 4/7, second white = 3/6. Probability = (4/7)×(3/6) = 2/7."
    },
    {
        id: 190,
        category: "Permutation & Combination",
        difficulty: "Hard",
        question: "How many 4-letter words can be formed from 'MATHS' without repetition?",
        options: { A: "60", B: "80", C: "100", D: "120" },
        answer: "D",
        solution: "P(5,4) = 5! = 120."
    },
    {
        id: 191,
        category: "Algebra",
        difficulty: "Hard",
        question: "Solve: 2x² + 5x + 2 = 0.",
        options: { A: "-2,-1/2", B: "2,1/2", C: "-2,1/2", D: "2,-1/2" },
        answer: "A",
        solution: "(2x+1)(x+2) = 0 → x = -2, -1/2."
    },
    {
        id: 192,
        category: "Mensuration",
        difficulty: "Hard",
        question: "A sphere has radius 3cm. What is its volume? (π=22/7)",
        options: { A: "110 cm³", B: "112 cm³", C: "113 cm³", D: "115 cm³" },
        answer: "C",
        solution: "Volume = (4/3)πr³ = (4/3)×(22/7)×27 = 113.14 ≈ 113 cm³."
    },
    {
        id: 193,
        category: "Number Series",
        difficulty: "Hard",
        question: "Find next: 1, 8, 27, 64, __?",
        options: { A: "100", B: "110", C: "120", D: "125" },
        answer: "D",
        solution: "Cubes of 1,2,3,4,5. Next = 5³ = 125."
    },
    {
        id: 194,
        category: "Coding-Decoding",
        difficulty: "Hard",
        question: "If 'PENCIL' is coded as 'OFMBHK', what is 'PAPER'?",
        options: { A: "OZODQ", B: "OZOCQ", C: "OZODP", D: "NYNCQ" },
        answer: "A",
        solution: "Each letter is shifted -1. P→O, A→Z, P→O, E→D, R→Q."
    },
    {
        id: 195,
        category: "Blood Relations",
        difficulty: "Hard",
        question: "A is B's father, B is C's son, C is D's daughter. How is A related to D?",
        options: { A: "Son-in-law", B: "Brother-in-law", C: "Husband", D: "Cannot determine" },
        answer: "A",
        solution: "A is father of B, C is mother of B, D is mother of C. So A is son-in-law of D."
    },
    {
        id: 196,
        category: "Direction Sense",
        difficulty: "Hard",
        question: "A person walks 10m North, 10m East, 10m South. How far from start?",
        options: { A: "0m", B: "5m", C: "10m", D: "20m" },
        answer: "C",
        solution: "Net displacement = 10m East (North and South cancel)."
    },
    {
        id: 197,
        category: "Analogies",
        difficulty: "Hard",
        question: "Book is to Chapter as Movie is to __?",
        options: { A: "Scene", B: "Actor", C: "Director", D: "Theatre" },
        answer: "A",
        solution: "A book is made of chapters, a movie is made of scenes."
    },
    {
        id: 198,
        category: "Logical Puzzles",
        difficulty: "Hard",
        question: "If 3 men can build a wall in 10 days, how many men needed to build in 6 days?",
        options: { A: "4", B: "5", C: "6", D: "7" },
        answer: "B",
        solution: "3 × 10 = M × 6 → M = 5 men."
    },
    {
        id: 199,
        category: "Data Interpretation",
        difficulty: "Hard",
        question: "A test has 200 questions. A student answers 150 correctly. What is the percentage?",
        options: { A: "70%", B: "72%", C: "75%", D: "78%" },
        answer: "C",
        solution: "(150/200) × 100 = 75%."
    },
    {
        id: 200,
        category: "Percentages",
        difficulty: "Hard",
        question: "A candidate scored 75% in a 200-mark test. How many marks did he get?",
        options: { A: "140", B: "145", C: "150", D: "155" },
        answer: "C",
        solution: "75% of 200 = 150 marks."
    }
];

// ============================================================
// VALIDATION
// ============================================================
console.log(`✅ Total questions loaded: ${questions.length}`);
if (questions.length !== 200) {
    console.warn(`⚠️ Expected 200 questions, got ${questions.length}`);
}

// ============================================================
// APPLICATION STATE
// ============================================================
const STATE_KEY = 'aptitudeTestState';
const THEME_KEY = 'aptitudeTheme';

let state = {
    currentQuestion: 0,
    answers: {},
    score: 0,
    remainingTime: 5400, // 90 minutes in seconds
    startTime: null,
    completed: false,
    result: null,
    questionOrder: [] // for randomization
};

let questionsList = [...questions];
let timerInterval = null;
let isAnswerLocked = false;

// ============================================================
// DOM REFERENCES
// ============================================================
const $ = (id) => document.getElementById(id);
const startScreen = $('startScreen');
const testScreen = $('testScreen');
const resultScreen = $('resultScreen');
const startTestBtn = $('startTestBtn');
const resumeTestBtn = $('resumeTestBtn');
const newTestFromResumeBtn = $('newTestFromResumeBtn');
const newTestFromResultBtn = $('newTestFromResultBtn');
const confirmNewTestBtn = $('confirmNewTestBtn');
const viewPrevResultBtn = $('viewPrevResultBtn');
const clearDataBtn = $('clearDataBtn');
const clearDataStartBtn = $('clearDataStartBtn');
const clearDataResultBtn = $('clearDataResultBtn');
const confirmClearBtn = $('confirmClearBtn');
const submitTestBtn = $('submitTestBtn');
const confirmSubmitBtn = $('confirmSubmitBtn');
const downloadPdfBtn = $('downloadPdfBtn');
const themeToggle = $('themeToggle');
const resumeBanner = $('resumeBanner');
const prevResultPreview = $('prevResultPreview');
const prevResultCard = $('prevResultCard');

// ============================================================
// INITIALIZATION
// ============================================================
function initializeApp() {
    loadTheme();
    checkSavedState();
    setupEventListeners();
}

function checkSavedState() {
    const saved = localStorage.getItem(STATE_KEY);
    const hasResult = localStorage.getItem('aptitudeResult');
    
    if (hasResult) {
        const result = JSON.parse(hasResult);
        showPreviousResult(result);
    }
    
    if (saved) {
        const data = JSON.parse(saved);
        if (!data.completed) {
            resumeBanner.classList.remove('d-none');
            resumeBanner.querySelector('span').innerHTML = 
                `<i class="bi bi-info-circle-fill"></i> Previous test progress found. 
                 Question ${data.currentQuestion+1}/200, Score: ${data.score}`;
        }
    }
}

function setupEventListeners() {
    // Start/Resume
    startTestBtn.addEventListener('click', () => startNewTest());
    resumeTestBtn.addEventListener('click', () => resumeTest());
    newTestFromResumeBtn.addEventListener('click', () => showNewTestModal());
    newTestFromResultBtn.addEventListener('click', () => showNewTestModal());
    confirmNewTestBtn.addEventListener('click', () => { 
        bootstrap.Modal.getInstance($('newTestModal')).hide();
        startNewTest();
    });
    
    // Navigation
    $('prevBtn').addEventListener('click', () => navigateQuestion(-1));
    $('nextBtn').addEventListener('click', () => navigateQuestion(1));
    
    // Submit
    submitTestBtn.addEventListener('click', () => showSubmitModal());
    confirmSubmitBtn.addEventListener('click', () => {
        bootstrap.Modal.getInstance($('submitModal')).hide();
        submitTest();
    });
    
    // Clear Data
    [clearDataBtn, clearDataStartBtn, clearDataResultBtn].forEach(btn => {
        btn.addEventListener('click', () => showClearModal());
    });
    confirmClearBtn.addEventListener('click', () => {
        bootstrap.Modal.getInstance($('clearModal')).hide();
        clearAllData();
    });
    
    // Theme
    themeToggle.addEventListener('click', toggleTheme);
    
    // PDF
    downloadPdfBtn.addEventListener('click', generatePDF);
    
    // Review search/filter
    $('reviewSearch').addEventListener('input', renderReview);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderReview();
        });
    });
    
    // View Previous Result
    viewPrevResultBtn.addEventListener('click', () => {
        const result = localStorage.getItem('aptitudeResult');
        if (result) showResult(JSON.parse(result));
    });
}

// ============================================================
// THEME MANAGEMENT
// ============================================================
function loadTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

// ============================================================
// TEST MANAGEMENT
// ============================================================
function startNewTest() {
    // Clear any existing state
    const hasProgress = localStorage.getItem(STATE_KEY);
    if (hasProgress) {
        const data = JSON.parse(hasProgress);
        if (!data.completed) {
            showNewTestModal(true);
            return;
        }
    }
    
    // Randomize if setting enabled
    const randomize = localStorage.getItem('randomizeQuestions') === 'true';
    if (randomize) {
        questionsList = shuffleArray([...questions]);
    } else {
        questionsList = [...questions];
    }
    
    state = {
        currentQuestion: 0,
        answers: {},
        score: 0,
        remainingTime: 5400,
        startTime: Date.now(),
        completed: false,
        result: null,
        questionOrder: questionsList.map(q => q.id)
    };
    
    saveState();
    enterTestMode();
}

function resumeTest() {
    const saved = localStorage.getItem(STATE_KEY);
    if (!saved) return;
    
    const data = JSON.parse(saved);
    state = data;
    
    // Restore questions order
    if (state.questionOrder) {
        const orderMap = {};
        questions.forEach(q => orderMap[q.id] = q);
        questionsList = state.questionOrder.map(id => orderMap[id]).filter(Boolean);
        if (questionsList.length !== 200) questionsList = [...questions];
    } else {
        questionsList = [...questions];
    }
    
    resumeBanner.classList.add('d-none');
    enterTestMode();
}

function enterTestMode() {
    startScreen.classList.add('d-none');
    testScreen.classList.remove('d-none');
    resultScreen.classList.add('d-none');
    
    // Show header controls
    document.querySelector('#headerTestControls').classList.remove('d-none');
    
    renderQuestion();
    renderNavigator();
    updateProgress();
    updateStats();
    startTimer();
}

function exitTestMode() {
    testScreen.classList.add('d-none');
    document.querySelector('#headerTestControls').classList.add('d-none');
    stopTimer();
}

// ============================================================
// QUESTION RENDERING
// ============================================================
function renderQuestion() {
    const q = questionsList[state.currentQuestion];
    if (!q) return;
    
    $('qNumberDisplay').textContent = state.currentQuestion + 1;
    $('qText').textContent = q.question;
    $('qCategoryBadge').textContent = q.category;
    $('mobileQNum').textContent = state.currentQuestion + 1;
    
    // Render options
    const container = $('optionsContainer');
    container.innerHTML = '';
    
    const letters = ['A', 'B', 'C', 'D'];
    const selected = state.answers[q.id];
    const isAnswered = selected !== undefined && selected !== null;
    const isCorrect = isAnswered && selected === q.answer;
    
    letters.forEach(letter => {
        const div = document.createElement('div');
        div.className = 'option-card';
        div.dataset.letter = letter;
        
        if (isAnswered) {
            div.classList.add('disabled');
            if (letter === selected) {
                div.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
            }
            if (letter === q.answer && selected !== q.answer) {
                div.classList.add('show-correct');
            }
        }
        
        div.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${q.options[letter]}</span>
            ${isAnswered ? `<span class="option-icon">${letter === selected ? (isCorrect ? '✅' : '❌') : (letter === q.answer ? '✅' : '')}</span>` : ''}
        `;
        
        if (!isAnswered) {
            div.addEventListener('click', () => selectAnswer(letter));
        }
        
        container.appendChild(div);
    });
    
    // Feedback
    const feedbackArea = $('feedbackArea');
    if (isAnswered) {
        feedbackArea.classList.remove('d-none');
        const alert = $('feedbackAlert');
        alert.className = `alert ${isCorrect ? 'correct' : 'incorrect'}`;
        alert.innerHTML = `
            <span class="alert-icon">${isCorrect ? '✅' : '❌'}</span>
            <span>${isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</span>
        `;
        
        $('solutionArea').classList.remove('d-none');
        $('solutionText').textContent = q.solution;
    } else {
        feedbackArea.classList.add('d-none');
        $('solutionArea').classList.add('d-none');
    }
    
    // Update navigator
    renderNavigator();
    updateProgress();
    updateStats();
}

function selectAnswer(letter) {
    const q = questionsList[state.currentQuestion];
    if (!q) return;
    if (state.answers[q.id] !== undefined) return;
    
    const isCorrect = letter === q.answer;
    state.answers[q.id] = letter;
    if (isCorrect) state.score++;
    
    saveState();
    renderQuestion();
    renderNavigator();
    updateProgress();
    updateStats();
}

function navigateQuestion(delta) {
    const newIndex = state.currentQuestion + delta;
    if (newIndex < 0 || newIndex >= questionsList.length) return;
    state.currentQuestion = newIndex;
    saveState();
    renderQuestion();
    renderNavigator();
}

// ============================================================
// NAVIGATOR
// ============================================================
function renderNavigator() {
    const containers = ['questionNavigator', 'mobileNavigator'];
    containers.forEach(id => {
        const container = $(id);
        if (!container) return;
        container.innerHTML = '';
        
        questionsList.forEach((q, index) => {
            const btn = document.createElement('button');
            btn.className = 'nav-btn';
            btn.textContent = index + 1;
            
            const isAnswered = state.answers[q.id] !== undefined && state.answers[q.id] !== null;
            const isCorrect = isAnswered && state.answers[q.id] === q.answer;
            
            if (index === state.currentQuestion) btn.classList.add('current');
            if (isAnswered && isCorrect) btn.classList.add('correct');
            else if (isAnswered && !isCorrect) btn.classList.add('wrong');
            else if (isAnswered) btn.classList.add('answered');
            
            btn.addEventListener('click', () => {
                state.currentQuestion = index;
                saveState();
                renderQuestion();
                renderNavigator();
                // Close mobile offcanvas
                const canvas = bootstrap.Offcanvas.getInstance($('mobileNavCanvas'));
                if (canvas) canvas.hide();
            });
            
            container.appendChild(btn);
        });
    });
}

// ============================================================
// PROGRESS & STATS
// ============================================================
function updateProgress() {
    const answered = Object.keys(state.answers).filter(k => state.answers[k] !== null).length;
    const total = questionsList.length;
    const pct = (answered / total) * 100;
    
    $('progressBar').style.width = pct + '%';
    $('progressText').textContent = `${answered} / ${total}`;
}

function updateStats() {
    let correct = 0, wrong = 0, answered = 0;
    questionsList.forEach(q => {
        const ans = state.answers[q.id];
        if (ans !== undefined && ans !== null) {
            answered++;
            if (ans === q.answer) correct++;
            else wrong++;
        }
    });
    
    const remaining = questionsList.length - answered;
    
    ['navAnswered', 'mNavAnswered'].forEach(id => $(id).textContent = answered);
    ['navRemaining', 'mNavRemaining'].forEach(id => $(id).textContent = remaining);
    ['navCorrect', 'mNavCorrect'].forEach(id => $(id).textContent = correct);
    ['navWrong', 'mNavWrong'].forEach(id => $(id).textContent = wrong);
}

// ============================================================
// TIMER
// ============================================================
function startTimer() {
    stopTimer();
    timerInterval = setInterval(() => {
        state.remainingTime--;
        if (state.remainingTime <= 0) {
            state.remainingTime = 0;
            updateTimerDisplay();
            stopTimer();
            submitTest();
            return;
        }
        updateTimerDisplay();
        saveState();
    }, 1000);
    updateTimerDisplay();
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    const mins = Math.floor(state.remainingTime / 60);
    const secs = state.remainingTime % 60;
    const display = $('timerDisplay');
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    // Color warnings
    display.classList.remove('timer-warning', 'timer-danger');
    if (state.remainingTime < 300) display.classList.add('timer-danger');
    else if (state.remainingTime < 600) display.classList.add('timer-warning');
}

// ============================================================
// SUBMIT TEST
// ============================================================
function showSubmitModal() {
    const answered = Object.keys(state.answers).filter(k => state.answers[k] !== null).length;
    let correct = 0, wrong = 0;
    questionsList.forEach(q => {
        const ans = state.answers[q.id];
        if (ans === q.answer) correct++;
        else if (ans !== undefined && ans !== null) wrong++;
    });
    
    $('submitSummary').innerHTML = `
        <div class="mt-2">
            <div>Answered: ${answered} / ${questionsList.length}</div>
            <div>Unanswered: ${questionsList.length - answered}</div>
            <div class="text-success">Correct: ${correct}</div>
            <div class="text-danger">Wrong: ${wrong}</div>
        </div>
    `;
    
    const modal = new bootstrap.Modal($('submitModal'));
    modal.show();
}

function submitTest() {
    stopTimer();
    state.completed = true;
    state.remainingTime = Math.max(0, state.remainingTime);
    
    const result = calculateResult();
    state.result = result;
    saveState();
    
    // Save result separately
    localStorage.setItem('aptitudeResult', JSON.stringify(result));
    
    showResult(result);
}

function calculateResult() {
    let correct = 0, wrong = 0, unanswered = 0;
    const details = [];
    
    questionsList.forEach(q => {
        const ans = state.answers[q.id];
        const isCorrect = ans === q.answer;
        const isAnswered = ans !== undefined && ans !== null;
        
        if (!isAnswered) unanswered++;
        else if (isCorrect) correct++;
        else wrong++;
        
        details.push({
            ...q,
            selected: ans,
            isCorrect: isAnswered && isCorrect,
            isAnswered: isAnswered
        });
    });
    
    const attempted = correct + wrong;
    const percentage = (correct / questionsList.length) * 100;
    const grade = getGrade(percentage);
    const passed = percentage >= 50;
    
    const timeTaken = 5400 - state.remainingTime;
    const timeTakenStr = formatTime(timeTaken);
    const timeRemainingStr = formatTime(state.remainingTime);
    
    return {
        correct,
        wrong,
        unanswered,
        attempted,
        total: questionsList.length,
        score: correct,
        percentage: Math.round(percentage * 100) / 100,
        grade,
        passed,
        details,
        timeTaken: timeTakenStr,
        timeRemaining: timeRemainingStr,
        timestamp: new Date().toISOString()
    };
}

function getGrade(percentage) {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
}

// ============================================================
// RESULT DISPLAY
// ============================================================
function showResult(result) {
    exitTestMode();
    testScreen.classList.add('d-none');
    resultScreen.classList.remove('d-none');
    
    // Score
    $('resultScore').textContent = `${result.correct} / ${result.total}`;
    
    // Ring
    const pct = result.percentage;
    const circumference = 314.16;
    const offset = circumference - (pct / 100) * circumference;
    const ring = $('scoreRingCircle');
    ring.style.strokeDashoffset = offset;
    $('scoreRingText').textContent = `${Math.round(pct)}%`;
    
    // Grade
    $('resultGradeDisplay').textContent = result.grade;
    const passDisplay = $('resultPassDisplay');
    passDisplay.textContent = result.passed ? '✅ PASS' : '❌ FAIL';
    passDisplay.className = `badge fs-5 px-4 py-2 mx-auto ${result.passed ? 'pass' : 'fail'}`;
    
    // Stats
    $('rTotal').textContent = result.total;
    $('rAttempted').textContent = result.attempted;
    $('rCorrect').textContent = result.correct;
    $('rWrong').textContent = result.wrong;
    $('rUnanswered').textContent = result.unanswered;
    $('rPercentage').textContent = result.percentage + '%';
    $('rTimeTaken').textContent = result.timeTaken;
    
    // Category Performance
    renderCategoryPerformance(result.details);
    
    // Review
    renderReview();
}

function renderCategoryPerformance(details) {
    const container = $('categoryPerformance');
    const categories = {};
    
    details.forEach(d => {
        if (!categories[d.category]) {
            categories[d.category] = { correct: 0, total: 0 };
        }
        categories[d.category].total++;
        if (d.isCorrect) categories[d.category].correct++;
    });
    
    let html = '';
    for (const [name, data] of Object.entries(categories)) {
        const pct = (data.correct / data.total) * 100;
        html += `
            <div class="category-row">
                <div class="category-name">${name}</div>
                <div class="category-bar">
                    <div class="fill" style="width:${pct}%;"></div>
                </div>
                <div class="category-stats">${data.correct}/${data.total} (${Math.round(pct)}%)</div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function renderReview() {
    const container = $('reviewContainer');
    const search = $('reviewSearch').value.toLowerCase();
    const filter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    const result = state.result;
    if (!result) return;
    
    let filtered = result.details.filter(d => {
        const matchSearch = d.question.toLowerCase().includes(search);
        let matchFilter = true;
        if (filter === 'correct') matchFilter = d.isCorrect;
        else if (filter === 'wrong') matchFilter = d.isAnswered && !d.isCorrect;
        else if (filter === 'unanswered') matchFilter = !d.isAnswered;
        return matchSearch && matchFilter;
    });
    
    let html = '<div class="accordion" id="reviewAccordion">';
    filtered.forEach((d, idx) => {
        const status = d.isAnswered ? (d.isCorrect ? '✅ Correct' : '❌ Incorrect') : '⬜ Unanswered';
        const statusClass = d.isAnswered ? (d.isCorrect ? 'review-status-correct' : 'review-status-wrong') : 'review-status-unanswered';
        const selectedText = d.isAnswered ? `${d.selected}. ${d.options[d.selected]}` : 'Not answered';
        const correctText = `${d.answer}. ${d.options[d.answer]}`;
        
        html += `
            <div class="accordion-item review-item border-0 mb-2">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed rounded-3" type="button" data-bs-toggle="collapse" data-bs-target="#review${idx}">
                        <span class="fw-bold me-2">Q${d.id}.</span>
                        <span class="flex-grow-1 text-truncate">${d.question}</span>
                        <span class="ms-2 ${statusClass}">${status}</span>
                    </button>
                </h2>
                <div id="review${idx}" class="accordion-collapse collapse" data-bs-parent="#reviewAccordion">
                    <div class="accordion-body">
                        <div><strong>Your Answer:</strong> ${selectedText}</div>
                        <div><strong>Correct Answer:</strong> ${correctText}</div>
                        <div class="mt-2"><strong>Solution:</strong> ${d.solution}</div>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html || '<p class="text-muted">No questions match your filters.</p>';
}

// ============================================================
// PREVIOUS RESULT
// ============================================================
function showPreviousResult(result) {
    viewPrevResultBtn.classList.remove('d-none');
    prevResultPreview.classList.remove('d-none');
    
    prevResultCard.innerHTML = `
        <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
                <strong>Score:</strong> ${result.score}/${result.total}
                <span class="ms-2">(${result.percentage}%)</span>
            </div>
            <div>
                <span class="badge bg-primary">Grade: ${result.grade}</span>
                <span class="badge ${result.passed ? 'bg-success' : 'bg-danger'}">${result.passed ? 'PASS' : 'FAIL'}</span>
            </div>
        </div>
    `;
}

// ============================================================
// PDF GENERATION
// ============================================================
function generatePDF() {
    const result = state.result || JSON.parse(localStorage.getItem('aptitudeResult'));
    if (!result) {
        alert('No result to download.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 15;
    let y = 20;
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241);
    doc.text('APTITUDE ASSESSMENT', pageWidth/2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text('Recruitment Screening Test', pageWidth/2, y, { align: 'center' });
    y += 12;
    doc.setDrawColor(99, 102, 241);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;
    
    // Result Summary
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('Result Summary', margin, y);
    y += 8;
    doc.setFontSize(12);
    
    const lines = [
        `Score: ${result.score} / ${result.total}`,
        `Percentage: ${result.percentage}%`,
        `Grade: ${result.grade}`,
        `Result: ${result.passed ? 'PASS' : 'FAIL'}`,
        `Attempted: ${result.attempted}`,
        `Correct: ${result.correct}`,
        `Wrong: ${result.wrong}`,
        `Unanswered: ${result.unanswered}`,
        `Time Taken: ${result.timeTaken}`
    ];
    
    lines.forEach(line => {
        doc.text(line, margin, y);
        y += 6;
    });
    y += 6;
    
    // Category Performance
    doc.setFontSize(14);
    doc.text('Category Performance', margin, y);
    y += 8;
    doc.setFontSize(10);
    
    const categories = {};
    result.details.forEach(d => {
        if (!categories[d.category]) {
            categories[d.category] = { correct: 0, total: 0 };
        }
        categories[d.category].total++;
        if (d.isCorrect) categories[d.category].correct++;
    });
    
    const catData = Object.entries(categories).map(([name, data]) => [
        name,
        `${data.correct}/${data.total}`,
        `${Math.round((data.correct/data.total)*100)}%`
    ]);
    
    doc.autoTable({
        head: [['Category', 'Correct/Total', 'Percentage']],
        body: catData,
        startY: y,
        margin: { left: margin, right: margin },
        styles: { fontSize: 9 },
        headStyles: { fillColor: [99, 102, 241] }
    });
    
    y = doc.lastAutoTable.finalY + 10;
    
    // Question Review
    doc.addPage();
    y = 20;
    doc.setFontSize(16);
    doc.text('Question Review', margin, y);
    y += 8;
    doc.setFontSize(9);
    
    const reviewData = result.details.map(d => {
        const selectedText = d.isAnswered ? `${d.selected}. ${d.options[d.selected]}` : 'Not answered';
        const correctText = `${d.answer}. ${d.options[d.answer]}`;
        const status = d.isAnswered ? (d.isCorrect ? 'Correct' : 'Wrong') : 'Unanswered';
        return [
            `Q${d.id}`,
            d.question.substring(0, 50) + (d.question.length > 50 ? '...' : ''),
            selectedText,
            correctText,
            status
        ];
    });
    
    doc.autoTable({
        head: [['Q#', 'Question', 'Your Answer', 'Correct Answer', 'Status']],
        body: reviewData,
        startY: y,
        margin: { left: margin, right: margin },
        styles: { fontSize: 7, cellPadding: 1.5 },
        headStyles: { fillColor: [99, 102, 241] },
        alternateRowStyles: { fillColor: [245, 245, 250] },
        pageBreak: 'auto'
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `Generated on ${new Date().toLocaleDateString()} | Aptitude Assessment`,
            pageWidth/2,
            doc.internal.pageSize.height - 10,
            { align: 'center' }
        );
    }
    
    doc.save('aptitude-assessment-result.pdf');
}

// ============================================================
// CLEAR DATA
// ============================================================
function showClearModal() {
    const modal = new bootstrap.Modal($('clearModal'));
    modal.show();
}

function clearAllData() {
    localStorage.clear();
    state = {
        currentQuestion: 0,
        answers: {},
        score: 0,
        remainingTime: 5400,
        startTime: null,
        completed: false,
        result: null,
        questionOrder: []
    };
    questionsList = [...questions];
    stopTimer();
    
    // Reset UI
    startScreen.classList.remove('d-none');
    testScreen.classList.add('d-none');
    resultScreen.classList.add('d-none');
    document.querySelector('#headerTestControls').classList.add('d-none');
    resumeBanner.classList.add('d-none');
    prevResultPreview.classList.add('d-none');
    viewPrevResultBtn.classList.add('d-none');
    
    // Reset progress
    $('progressBar').style.width = '0%';
    $('progressText').textContent = '0 / 200';
    $('timerDisplay').textContent = '90:00';
    
    location.reload();
}

// ============================================================
// NEW TEST MODAL
// ============================================================
// function showNewTestModal(flag = false) {
//     if(!flag){
//         document.getElementById('newtestmodelbody').innerHTML = '<p>Starting a new test will delete your current progress.</p>';
//     }else{
//         document.getElementById('newtestmodelbody').innerHTML = '<p>Please complete the first test by clicking resume test or clear the data </p>';
//     }
//     const modal = new bootstrap.Modal($('newTestModal'));
//     modal.show();
// }

function showNewTestModal(flag = false) {
    const modalBody = document.getElementById('newtestmodelbody');
    if (!flag) {
        modalBody.innerHTML = '<p>Starting a new test will delete your current progress.</p>';
        document.getElementById('confirmNewTestBtn').classList.remove('d-none');
    } else {
        modalBody.innerHTML = '<p>Please complete the first test by clicking resume test or clear the data.</p>';
        document.getElementById('confirmNewTestBtn').classList.add('d-none');
    }
    const modal = new bootstrap.Modal($('newTestModal'));
    modal.show();
}

// ============================================================
// UTILITY
// ============================================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function saveState() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

// ============================================================
// BOOTSTRAP EVENT FIX FOR OFF CANVAS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap offcanvas
    const offcanvasEl = $('mobileNavCanvas');
    if (offcanvasEl) {
        new bootstrap.Offcanvas(offcanvasEl);
    }
    
    initializeApp();
});

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigateQuestion(-1);
    if (e.key === 'ArrowRight') navigateQuestion(1);
    if (e.key === 'Enter' && !testScreen.classList.contains('d-none')) {
        // Option shortcuts 1-4 for A-D
        if (e.key >= '1' && e.key <= '4') {
            const letters = ['A', 'B', 'C', 'D'];
            const idx = parseInt(e.key) - 1;
            const q = questionsList[state.currentQuestion];
            if (q && state.answers[q.id] === undefined) {
                selectAnswer(letters[idx]);
            }
        }
    }
});

console.log('✅ Aptitude Assessment Application Loaded Successfully');
console.log(`📊 ${questions.length} questions available`);