/* =========================================================
   Computer Fundamentals - Quiz System JavaScript
   ========================================================= */

// ═══════════════════════════════════════════════════════════
// QUESTION BANK — 25 questions, 5 per module
// ═══════════════════════════════════════════════════════════
const QUESTION_BANK = {
  "computer-basics": {
    title: "Computer Basics",
    icon:  "🖥️",
    color: "#3B5BDB",
    questions: [
      { q:"What does IPO stand for in the computer processing cycle?", opts:["Input, Power, Output","Input, Processing, Output","Instruction, Processing, Output","Internal, Processing, Output"], ans:1, exp:"IPO stands for Input → Processing → Output — the fundamental cycle of all computer operations." },
      { q:"Who is called the 'Father of the Computer'?", opts:["Alan Turing","Ada Lovelace","Charles Babbage","Bill Gates"], ans:2, exp:"Charles Babbage designed the Analytical Engine in 1837, the concept that became the modern computer." },
      { q:"What is the full form of CPU?", opts:["Computer Processing Unit","Central Processing Unit","Core Processing Unit","Control Processing Unit"], ans:1, exp:"CPU = Central Processing Unit — the brain of the computer that performs all operations." },
      { q:"ENIAC, the first electronic computer, was built in which year?", opts:["1932","1945","1951","1960"], ans:1, exp:"ENIAC (Electronic Numerical Integrator and Computer) was completed in 1945 at the University of Pennsylvania." },
      { q:"Computers work in which number system?", opts:["Decimal","Octal","Binary","Hexadecimal"], ans:2, exp:"Computers work in Binary (Base-2) — using only 0s and 1s — because transistors have two states: ON (1) and OFF (0)." },
      { q:"What does RAM stand for?", opts:["Random Access Memory","Read Access Memory","Rapid Access Memory","Read And Memory"], ans:0, exp:"RAM = Random Access Memory — the volatile primary memory used for running programs." },
      { q:"Which device is an example of an OUTPUT device?", opts:["Keyboard","Scanner","Printer","Mouse"], ans:2, exp:"A Printer is an output device — it produces a physical hard copy of computer data." },
      { q:"The brain of the computer is the ______.", opts:["Monitor","Hard Disk","CPU","RAM"], ans:2, exp:"The CPU (Central Processing Unit) is called the brain because it performs all calculations and controls all operations." },
      { q:"Which of the following is an example of System Software?", opts:["MS Word","Photoshop","Windows OS","VLC Player"], ans:2, exp:"Windows OS is System Software — it manages hardware resources and provides a platform for application software." },
      { q:"VDU stands for ______.", opts:["Visual Data Unit","Virtual Display Unit","Visual Display Unit","Video Data Unit"], ans:2, exp:"VDU = Visual Display Unit — another name for a Monitor (output device)." },
      { q:"Ada Lovelace is known as ______.", opts:["Mother of Hardware","First Programmer","Father of Internet","Mother of OS"], ans:1, exp:"Ada Lovelace wrote the world's first algorithm for Babbage's Analytical Engine and is called the First Programmer." },
      { q:"Which of the following is a BOTH input and output device?", opts:["Printer","Scanner","Touchscreen","Keyboard"], ans:2, exp:"A Touchscreen acts as input (touch) and output (display) — making it an I/O device." },
      { q:"What is BIOS?", opts:["Basic Input Output System","Binary Input Output Software","Basic Internal Operating System","Binary Instruction Output System"], ans:0, exp:"BIOS = Basic Input Output System — firmware stored in ROM that initializes hardware when you press the power button." },
      { q:"Which memory is volatile?", opts:["ROM","EPROM","Flash","RAM"], ans:3, exp:"RAM is volatile — all data stored in RAM is lost when the computer is powered off." },
      { q:"1 Byte equals how many bits?", opts:["4","16","8","2"], ans:2, exp:"1 Byte = 8 bits. This is a fundamental unit. 1 Nibble = 4 bits, 1 Byte = 8 bits, 1 Word = 16/32/64 bits." },
      { q:"What does GUI stand for?", opts:["General User Interface","Graphical User Interface","Global User Interface","General Utility Interface"], ans:1, exp:"GUI = Graphical User Interface — a visual interface using icons, windows, and a mouse (e.g., Windows, macOS)." },
      { q:"The storage capacity of a CD is approximately ______.", opts:["1.44 MB","4.7 GB","700 MB","25 GB"], ans:2, exp:"A standard CD has a storage capacity of 700 MB. DVD = 4.7 GB, Blu-ray = 25 GB." },
      { q:"Which of these is NOT an operating system?", opts:["Ubuntu","Android","MS Excel","iOS"], ans:2, exp:"MS Excel is an Application Software (spreadsheet program), not an operating system." },
      { q:"What is the first step of the CPU instruction cycle?", opts:["Decode","Execute","Store","Fetch"], ans:3, exp:"The Fetch-Decode-Execute cycle starts with FETCH — the CPU reads the next instruction from RAM using the Program Counter." },
      { q:"Dot Matrix is which type of printer?", opts:["Non-Impact","Laser","Inkjet","Impact"], ans:3, exp:"Dot Matrix is an Impact Printer — it physically strikes an ink ribbon against paper, like a typewriter mechanism." },
      { q:"Which register holds the NEXT instruction's memory address?", opts:["Accumulator","Instruction Register","Program Counter","Stack Pointer"], ans:2, exp:"The Program Counter (PC) holds the memory address of the next instruction to be fetched from RAM." },
      { q:"The kernel is ______.", opts:["An application software","The core of the OS","A type of RAM","A hardware device"], ans:1, exp:"The Kernel is the core of the Operating System — it directly interfaces with hardware and manages system resources." },
      { q:"Which generation of computers used vacuum tubes?", opts:["Second","Third","Fourth","First"], ans:3, exp:"First Generation computers (1940-1956) used Vacuum Tubes as their primary electronic switching component." },
      { q:"VLSI stands for ______.", opts:["Very Large Scale Integration","Very Low Speed Integration","Virtual Large Scale Interface","Very Large Software Interface"], ans:0, exp:"VLSI = Very Large Scale Integration — the technology used in 4th generation microprocessors, placing millions of transistors on one chip." },
      { q:"Who invented the Integrated Circuit (IC)?", opts:["Gordon Moore","Alan Turing","Jack Kilby","Charles Babbage"], ans:2, exp:"Jack Kilby invented the Integrated Circuit at Texas Instruments in 1958. He received the Nobel Prize in Physics in 2000." }
    ]
  },
  "hardware-software": {
    title: "Hardware & Software",
    icon:  "🔧",
    color: "#7048E8",
    questions: [
      { q:"Which of the following is an example of HARDWARE?", opts:["MS Word","Windows OS","Monitor","Google Chrome"], ans:2, exp:"A Monitor is hardware — a physical device you can touch. Software includes Windows, MS Word, and Chrome." },
      { q:"Which type of software controls hardware resources?", opts:["Application Software","Utility Software","System Software","Programming Software"], ans:2, exp:"System Software (like the Operating System) controls and manages all hardware resources." },
      { q:"Firmware is stored in which type of memory?", opts:["RAM","Hard Disk","ROM","Cache"], ans:2, exp:"Firmware is permanently stored in ROM (Read-Only Memory) chips on hardware devices like the motherboard's BIOS chip." },
      { q:"Which is an example of Application Software?", opts:["BIOS","Linux Kernel","Device Driver","Adobe Photoshop"], ans:3, exp:"Adobe Photoshop is Application Software designed for end users to perform a specific task (image editing)." },
      { q:"Software can be ______ easily, unlike hardware.", opts:["Manufactured","Physically felt","Copied/Duplicated","Repaired mechanically"], ans:2, exp:"Software can be easily copied and distributed digitally, unlike hardware which requires physical manufacturing." },
      { q:"Which of the following is an example of Utility Software?", opts:["VLC Media Player","Antivirus Program","MS PowerPoint","Google Chrome"], ans:1, exp:"Antivirus is Utility Software — it supports and maintains the computer system by protecting against malicious programs." },
      { q:"Open-source software means ______.", opts:["Free to use only","Source code is publicly available","Paid software","Government software"], ans:1, exp:"Open-source software has its source code publicly available, allowing anyone to view, modify, and distribute it (e.g., Linux, Firefox)." },
      { q:"Which is NOT an operating system?", opts:["Linux","Android","C++","macOS"], ans:2, exp:"C++ is a programming language, not an operating system. Linux, Android, and macOS are all operating systems." },
      { q:"A compiler is an example of ______.", opts:["Application Software","Hardware","Programming Software","Utility Software"], ans:2, exp:"A Compiler is Programming Software — it translates high-level language code into machine code (0s and 1s)." },
      { q:"Which memory is NON-volatile?", opts:["RAM","Cache","Register","ROM"], ans:3, exp:"ROM (Read-Only Memory) is non-volatile — data persists even when power is turned off. RAM is volatile." },
      { q:"SSD uses which type of memory technology?", opts:["DRAM","Magnetic platters","NAND Flash (EEPROM)","SRAM"], ans:2, exp:"SSD uses NAND Flash memory (a type of EEPROM) — non-volatile flash chips with no moving parts." },
      { q:"What is the full form of ALU?", opts:["Arithmetic Logical Unit","Arithmetic Logic Unit","Advanced Logic Unit","Arithmetic Level Unit"], ans:1, exp:"ALU = Arithmetic Logic Unit — the part of the CPU that performs arithmetic (+,-,×,÷) and logical (AND,OR,NOT) operations." },
      { q:"Which file system is used by Windows OS?", opts:["ext4","APFS","FAT32 only","NTFS"], ans:3, exp:"NTFS (New Technology File System) is the primary file system used by modern Windows OS (Windows XP onwards)." },
      { q:"The process of starting a computer from a powered-off state is called ______.", opts:["Warm Boot","Cold Boot","Restart","Formatting"], ans:1, exp:"Cold Boot = starting from a completely powered-off state. Warm Boot = restarting while powered on (Ctrl+Alt+Del)." },
      { q:"Which register stores the result of ALU operations?", opts:["Program Counter","Instruction Register","Accumulator","MAR"], ans:2, exp:"The Accumulator (ACC) register stores the result of ALU arithmetic and logical operations." },
      { q:"EPROM is erased using ______.", opts:["Electrical signals","Ultraviolet (UV) light","Magnetic fields","Heat"], ans:1, exp:"EPROM (Erasable Programmable ROM) is erased by exposing the chip's quartz window to ultraviolet (UV) light." },
      { q:"Which of the following is Secondary Storage?", opts:["RAM","ROM","Cache","HDD"], ans:3, exp:"HDD (Hard Disk Drive) is Secondary Storage — non-volatile storage for permanent data. RAM, ROM, Cache are primary/internal." },
      { q:"DDR stands for ______.", opts:["Dynamic Data Rate","Double Data Register","Double Data Rate","Digital Data RAM"], ans:2, exp:"DDR = Double Data Rate — RAM that transfers data on both the rising and falling clock edges, doubling throughput." },
      { q:"1 GB equals ______.", opts:["1000 MB","512 MB","1024 MB","100 MB"], ans:2, exp:"1 GB = 1024 MB. The binary system uses powers of 2: 1 KB=1024 B, 1 MB=1024 KB, 1 GB=1024 MB, 1 TB=1024 GB." },
      { q:"Which CPU architecture is used in smartphones?", opts:["CISC","x86","RISC (ARM)","VLIW"], ans:2, exp:"Smartphones use RISC architecture (specifically ARM processors) — low power, efficient, and suitable for mobile devices." },
      { q:"L1, L2, L3 refer to levels of ______.", opts:["RAM","Cache Memory","ROM","Hard Disk Storage"], ans:1, exp:"L1, L2, L3 are three levels of Cache Memory inside/near the CPU. L1 is fastest/smallest; L3 is slowest/largest." },
      { q:"What does 'booting' mean?", opts:["Formatting the hard drive","Installing software","Loading the OS into RAM when starting the computer","Shutting down the computer"], ans:2, exp:"Booting is the process of loading the Operating System from storage into RAM when the computer is powered on." },
      { q:"Which of the following is a RISC processor?", opts:["Intel Core i9","AMD Ryzen 9","Apple M2 (ARM)","Intel Xeon"], ans:2, exp:"Apple M2 is based on ARM architecture — a RISC design known for efficiency and performance per watt." },
      { q:"What is the full form of EEPROM?", opts:["Electrically Erasable Programmable ROM","Electronic Erasable Permanent ROM","Easily Erasable Programmable ROM","Electrically Encoded Programmable ROM"], ans:0, exp:"EEPROM = Electrically Erasable Programmable ROM — can be erased and reprogrammed using electrical signals (used in BIOS chips and flash drives)." },
      { q:"The first commercial microprocessor was ______.", opts:["Intel 8086","Intel 4004","AMD Ryzen","Motorola 68000"], ans:1, exp:"Intel 4004 (1971) was the world's first commercial microprocessor — a 4-bit chip with 2300 transistors running at 740 KHz." }
    ]
  },
  "number-systems": {
    title: "Number Systems",
    icon:  "🔢",
    color: "#10B981",
    questions: [
      { q:"What is the decimal value of binary 1010?", opts:["12","10","8","15"], ans:1, exp:"1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 8+0+2+0 = 10₁₀" },
      { q:"Hexadecimal 'F' represents which decimal value?", opts:["14","15","16","12"], ans:1, exp:"In hexadecimal: A=10, B=11, C=12, D=13, E=14, F=15. These letters represent values 10-15 with a single digit." },
      { q:"How many bits are in one byte?", opts:["4","16","2","8"], ans:3, exp:"1 Byte = 8 bits. This is a fundamental computing unit. 1 Nibble = 4 bits, 1 Byte = 8 bits." },
      { q:"To convert binary to octal, bits are grouped in sets of ______.", opts:["2","4","8","3"], ans:3, exp:"Binary → Octal: group 3 bits from right. Binary → Hex: group 4 bits from right." },
      { q:"The ASCII value of uppercase 'A' is ______.", opts:["97","48","65","41"], ans:2, exp:"ASCII 'A' = 65₁₀ = 01000001₂. Lowercase 'a' = 97. Digit '0' = 48." },
      { q:"What is the binary representation of decimal 13?", opts:["1010","1100","1101","1011"], ans:2, exp:"13÷2=6R1, 6÷2=3R0, 3÷2=1R1, 1÷2=0R1. Reading bottom-up: 1101₂" },
      { q:"Hexadecimal 'FF' equals which decimal value?", opts:["240","200","255","128"], ans:2, exp:"FF₁₆ = 15×16¹ + 15×16⁰ = 240+15 = 255₁₀. This is the maximum value of 1 byte (8 bits all set to 1)." },
      { q:"Octal number system uses digits from ______.", opts:["0 to 9","0 to 7","0 to 8","0 to 6"], ans:1, exp:"Octal (Base-8) uses digits 0,1,2,3,4,5,6,7 only. The value 8 is written as '10' in octal." },
      { q:"Convert binary 11001100 to hexadecimal.", opts:["AC","CC","CA","BC"], ans:1, exp:"Group 4 bits: 1100|1100. 1100₂=12₁₀=C. So 11001100₂ = CC₁₆" },
      { q:"What is the base of the hexadecimal number system?", opts:["2","8","10","16"], ans:3, exp:"Hexadecimal is Base-16. It uses digits 0-9 and letters A-F (representing 10-15)." },
      { q:"The decimal value of octal 17 is ______.", opts:["15","17","8","23"], ans:0, exp:"17₈ = 1×8¹ + 7×8⁰ = 8+7 = 15₁₀" },
      { q:"Which number system do computers use internally?", opts:["Decimal","Octal","Hexadecimal","Binary"], ans:3, exp:"Computers use Binary internally because transistors have two states: ON (1) and OFF (0)." },
      { q:"Maximum value that can be stored in 8 bits is ______.", opts:["128","127","256","255"], ans:3, exp:"Max 8-bit value = 11111111₂ = 255₁₀ = FF₁₆. With sign bit, signed range is -128 to +127." },
      { q:"The '0x' prefix in programming indicates ______.", opts:["Octal number","Binary number","Hexadecimal number","Decimal number"], ans:2, exp:"0x prefix indicates a hexadecimal number in programming. Example: 0xFF = 255 decimal." },
      { q:"Convert decimal 45 to binary.", opts:["100110","101101","110010","101011"], ans:1, exp:"45÷2: 22R1, 11R0, 5R1, 2R1, 1R0, 0R1. Bottom-up: 101101₂" },
      { q:"ASCII stands for ______.", opts:["American Standard Code for Information Interchange","American System Code for Internal Information","Advanced Standard Code for Information Interchange","American Standard Computer Information Interface"], ans:0, exp:"ASCII = American Standard Code for Information Interchange — assigns unique numbers to characters (7-bit, 128 characters)." },
      { q:"What is 1111₂ in decimal?", opts:["8","14","15","16"], ans:2, exp:"1111₂ = 1×8+1×4+1×2+1×1 = 8+4+2+1 = 15₁₀" },
      { q:"Binary number system has a base of ______.", opts:["8","10","2","16"], ans:2, exp:"Binary = Base-2. Uses only two digits: 0 and 1. Each position is a power of 2." },
      { q:"The hexadecimal color code #FFFFFF represents ______.", opts:["Black","Red","Blue","White"], ans:3, exp:"#FFFFFF = R:FF, G:FF, B:FF = R:255, G:255, B:255 = maximum of all colors = White." },
      { q:"4 bits are called ______.", opts:["Byte","Word","Nibble","Kilobyte"], ans:2, exp:"4 bits = 1 Nibble. 8 bits = 1 Byte. A nibble is exactly one hexadecimal digit (0-F)." },
      { q:"Convert 255₁₀ to Octal.", opts:["337","377","773","357"], ans:1, exp:"255÷8=31R7, 31÷8=3R7, 3÷8=0R3. Bottom-up: 377₈" },
      { q:"Which is the correct binary addition: 1+1=?", opts:["2","10","11","01"], ans:1, exp:"In binary: 1+1=10₂ (which is 2₁₀). There is no digit '2' in binary — it carries over to the next position." },
      { q:"In hexadecimal, the letter 'D' represents ______.", opts:["12","14","11","13"], ans:3, exp:"Hex digits: A=10, B=11, C=12, D=13, E=14, F=15. So D = 13." },
      { q:"1 Kilobyte (KB) = ______.", opts:["1000 Bytes","100 Bytes","1024 Bytes","512 Bytes"], ans:2, exp:"1 KB = 1024 Bytes (2¹⁰). This is the binary standard. SI standard uses 1 kB = 1000 bytes (kilobyte), but computing uses 1024." },
      { q:"To convert binary to hexadecimal, bits are grouped in sets of ______.", opts:["2","3","8","4"], ans:3, exp:"Binary → Hex: group 4 bits from right. Each group of 4 bits = 1 hex digit (0-F). Example: 1010₂ = A₁₆" }
    ]
  },
  "os-cpu": {
    title: "OS & CPU Architecture",
    icon:  "⚙️",
    color: "#F59E0B",
    questions: [
      { q:"Which is NOT a function of an Operating System?", opts:["Memory Management","Process Management","Designing web pages","Device Management"], ans:2, exp:"Designing web pages is done by web developers using HTML/CSS/JS — it is not a function of the Operating System." },
      { q:"The core of the Operating System is called ______.", opts:["Shell","Driver","Compiler","Kernel"], ans:3, exp:"The Kernel is the core of the OS that directly interfaces with hardware and manages all system resources." },
      { q:"Which OS type is best for aircraft control systems?", opts:["Batch OS","Distributed OS","Real-Time OS","Mobile OS"], ans:2, exp:"Real-Time OS (RTOS) guarantees responses within strict time limits — critical for systems where delays could be fatal." },
      { q:"The correct order of CPU instruction cycle is ______.", opts:["Execute→Fetch→Decode","Decode→Execute→Fetch","Fetch→Execute→Decode","Fetch→Decode→Execute"], ans:3, exp:"The FDE cycle: Fetch (read instruction from RAM) → Decode (interpret instruction) → Execute (perform operation)." },
      { q:"ARM processors (smartphones) use which architecture?", opts:["CISC","VLIW","x86","RISC"], ans:3, exp:"ARM uses RISC (Reduced Instruction Set Computer) architecture — simple instructions, low power, ideal for mobile devices." },
      { q:"1 GHz means the CPU executes ______ cycles per second.", opts:["1 Million","1 Billion","100 Million","1 Trillion"], ans:1, exp:"1 GHz = 1 Gigahertz = 1,000,000,000 (1 Billion) clock cycles per second." },
      { q:"Which register holds the address of the NEXT instruction?", opts:["ACC","IR","SP","PC"], ans:3, exp:"Program Counter (PC) holds the memory address of the next instruction to be fetched from RAM." },
      { q:"The process of loading OS into RAM on startup is ______.", opts:["Formatting","Compiling","Booting","Partitioning"], ans:2, exp:"Booting is the process of loading the OS from storage into RAM. Cold Boot = power on; Warm Boot = restart." },
      { q:"Which file system does Linux primarily use?", opts:["NTFS","APFS","FAT32","ext4"], ans:3, exp:"Linux uses ext4 (Fourth Extended Filesystem) as its primary file system. Windows uses NTFS, macOS uses APFS." },
      { q:"CISC stands for ______.", opts:["Complex Instruction Set Computer","Complete Instruction Set Computer","Complex Internal Set Computer","Central Instruction Set Controller"], ans:0, exp:"CISC = Complex Instruction Set Computer — uses many complex multi-cycle instructions (e.g., Intel x86, AMD processors)." },
      { q:"What is the function of the ALU?", opts:["Stores instructions permanently","Manages input/output devices","Performs arithmetic and logical operations","Controls data flow in CPU"], ans:2, exp:"ALU (Arithmetic Logic Unit) performs arithmetic operations (+,-,×,÷) and logical operations (AND, OR, NOT, XOR)." },
      { q:"The MAR register holds ______.", opts:["The current instruction being executed","The result of the last ALU operation","A memory address for RAM access","The next instruction's address"], ans:2, exp:"MAR (Memory Address Register) holds the address in RAM from which data is to be read or to which data is to be written." },
      { q:"Time-sharing OS divides CPU time into ______.", opts:["Tasks","Programs","Quanta (time slices)","Threads"], ans:2, exp:"Time-sharing OS divides CPU time into small slices called 'quanta' (or time slices), giving each process a turn." },
      { q:"A Dual-core processor has ______ processing cores.", opts:["1","4","2","8"], ans:2, exp:"Dual-core = 2 CPU cores on one chip. Quad-core = 4, Octa-core = 8. Each core can execute instructions independently." },
      { q:"Which bus carries actual data between CPU and RAM?", opts:["Control Bus","Address Bus","Data Bus","System Bus"], ans:2, exp:"Data Bus carries actual data/instructions between CPU, RAM, and I/O devices. Width (8/16/32/64-bit) determines transfer amount." },
      { q:"The MDR register is also called ______.", opts:["Memory Data Register / MBR","Memory Direct Register","Main Data Register","Memory Decode Register"], ans:0, exp:"MDR (Memory Data Register), also called MBR (Memory Buffer Register), holds data being transferred to/from RAM." },
      { q:"Which CPU scheduling algorithm is most used in time-sharing?", opts:["FCFS","SJF","Priority Scheduling","Round Robin"], ans:3, exp:"Round Robin is the most commonly used scheduling algorithm in time-sharing systems — each process gets a fixed time quantum." },
      { q:"The 5th state of a process (when waiting for I/O) is ______.", opts:["Ready","Running","New","Waiting/Blocked"], ans:3, exp:"Process states: New → Ready → Running → Waiting/Blocked (for I/O) → back to Ready → Terminated." },
      { q:"Multitasking means ______.", opts:["Multiple users using one computer","True simultaneous execution on multiple CPUs","One CPU rapidly switching between tasks","Running multiple OS instances"], ans:2, exp:"Multitasking = one CPU rapidly switching between tasks, giving the illusion of simultaneous execution." },
      { q:"Flag register stores ______.", opts:["Memory addresses","CPU speed information","Condition flags (Zero, Carry, Overflow)","Current instruction"], ans:2, exp:"Flag/Status Register stores condition flags set by ALU operations: Zero (Z), Carry (C), Overflow (O), Sign (S) flags." },
      { q:"Which transistor was invented at Bell Labs in 1947?", opts:["MOSFET","BJT Transistor","IC","Vacuum Tube"], ans:1, exp:"The Bipolar Junction Transistor (BJT) was invented at Bell Labs in 1947 by Shockley, Bardeen and Brattain — leading to 2nd gen computers." },
      { q:"Moore's Law states transistors double every ______.", opts:["6 months","5 years","2 years","1 year"], ans:2, exp:"Moore's Law (Gordon Moore, 1965): transistor count on a chip doubles approximately every 2 years while cost halves." },
      { q:"The first generation of computers used ______.", opts:["Transistors","ICs","Vacuum Tubes","Microprocessors"], ans:2, exp:"1st generation (1940-1956) used Vacuum Tubes for switching. They were large, hot, unreliable, and consumed huge power." },
      { q:"Intel 4004, the first microprocessor, was released in ______.", opts:["1965","1971","1981","1975"], ans:1, exp:"Intel 4004 was released in 1971 — a 4-bit microprocessor with 2300 transistors running at 740 KHz." },
      { q:"ENIAC was built at ______.", opts:["MIT","Harvard","Stanford","University of Pennsylvania"], ans:3, exp:"ENIAC was built at the Moore School of Electrical Engineering, University of Pennsylvania in 1945 by Eckert and Mauchly." }
    ]
  },
  "networks-db": {
    title: "Networks & Databases",
    icon:  "🌐",
    color: "#0EA5E9",
    questions: [
      { q:"Which network type covers a city or metropolitan area?", opts:["LAN","PAN","MAN","WAN"], ans:2, exp:"MAN (Metropolitan Area Network) covers 5–50 km — a city or group of buildings. LAN = building, WAN = global." },
      { q:"In Star topology, all devices connect to ______.", opts:["Each other directly","A central hub or switch","A shared backbone cable","A ring cable"], ans:1, exp:"Star topology: every device connects to a central hub or switch. Most common in modern LANs — easy to manage and troubleshoot." },
      { q:"Which OSI layer handles IP addressing and routing?", opts:["Layer 2 — Data Link","Layer 4 — Transport","Layer 1 — Physical","Layer 3 — Network"], ans:3, exp:"Layer 3 (Network layer) handles logical addressing (IP) and routing packets between networks. Routers operate here." },
      { q:"TCP provides ______ data delivery.", opts:["Unreliable, fast","Reliable, ordered","Connectionless","Broadcast-only"], ans:1, exp:"TCP (Transmission Control Protocol) provides reliable, connection-oriented, ordered delivery. Used for HTTP, email, FTP." },
      { q:"Which device operates at OSI Layer 2 using MAC addresses?", opts:["Hub","Router","Switch","Repeater"], ans:2, exp:"A Switch operates at Layer 2 (Data Link) and uses MAC addresses to forward frames only to the intended device." },
      { q:"The Internet is the world's largest example of ______.", opts:["LAN","MAN","PAN","WAN"], ans:3, exp:"WAN (Wide Area Network) spans countries and continents. The Internet is the world's largest WAN." },
      { q:"What does the 'P' in TCP/IP stand for?", opts:["Protocol","Process","Packet","Program"], ans:0, exp:"TCP/IP = Transmission Control Protocol / Internet Protocol. Both are protocols — sets of rules for network communication." },
      { q:"Which topology has every device connected to every other device?", opts:["Star","Bus","Ring","Mesh"], ans:3, exp:"Mesh topology: every device has a dedicated connection to every other device — maximum reliability, no single point of failure." },
      { q:"HTTP uses which port number by default?", opts:["443","21","25","80"], ans:3, exp:"HTTP (HyperText Transfer Protocol) uses port 80 by default. HTTPS = 443, FTP = 21, SMTP (email) = 25, SSH = 22." },
      { q:"A Modem's primary function is ______.", opts:["Route packets between networks","Convert digital signals to analog and back","Amplify network signals","Filter MAC addresses"], ans:1, exp:"Modem = MOdulator-DEModulator. Converts digital computer data to analog signals for telephone lines, and vice versa." },
      { q:"Which SQL command removes ALL rows from a table without deleting the table?", opts:["DROP","DELETE","REMOVE","TRUNCATE"], ans:3, exp:"TRUNCATE removes all rows from a table instantly (DDL command, cannot be rolled back). DROP deletes the entire table structure. DELETE removes rows one by one (DML, can be rolled back)." },
      { q:"Which key uniquely identifies each row in a database table?", opts:["Foreign Key","Candidate Key","Primary Key","Super Key"], ans:2, exp:"Primary Key uniquely identifies each row in a table. It cannot be NULL and must have unique values (e.g., StudentID, Aadhaar Number)." },
      { q:"The SQL command to retrieve data is ______.", opts:["INSERT","UPDATE","DELETE","SELECT"], ans:3, exp:"SELECT retrieves data from one or more tables. Basic syntax: SELECT column FROM table WHERE condition;" },
      { q:"Normalization is done to ______.", opts:["Speed up queries","Reduce data redundancy and improve integrity","Add more tables","Encrypt the database"], ans:1, exp:"Normalization organizes a database to minimize data redundancy (duplicate data) and eliminate insertion, update, and deletion anomalies." },
      { q:"3NF eliminates ______ dependency.", opts:["Partial","Join","Functional","Transitive"], ans:3, exp:"3NF (Third Normal Form) eliminates transitive dependency: a non-key column should not depend on another non-key column." },
      { q:"MongoDB is what type of database?", opts:["Relational (SQL)","Flat File","NoSQL (Document)","Hierarchical"], ans:2, exp:"MongoDB is a NoSQL document-oriented database that stores data as JSON-like BSON documents with flexible schemas." },
      { q:"ACID stands for ______.", opts:["Atomicity, Consistency, Isolation, Durability","Access, Control, Index, Data","Atomicity, Concurrency, Integrity, Durability","Automated, Centralized, Integrated, Distributed"], ans:0, exp:"ACID = Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent independence), Durability (committed data persists)." },
      { q:"Which SQL clause filters results based on a condition?", opts:["ORDER BY","GROUP BY","WHERE","HAVING"], ans:2, exp:"WHERE clause filters rows before grouping. HAVING filters after GROUP BY. ORDER BY sorts results. GROUP BY groups rows." },
      { q:"E.F. Codd is known as the ______.", opts:["Father of the Internet","Father of the Computer","Father of Relational Database","Father of Networking"], ans:2, exp:"Dr. Edgar F. Codd proposed the relational model in 1970 and defined 12 rules for a true RDBMS. He is the 'Father of Relational Database.'" },
      { q:"In OSI model, how many layers are there?", opts:["4","5","6","7"], ans:3, exp:"The OSI (Open Systems Interconnection) model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { q:"Which JOIN returns only the matching rows from both tables?", opts:["LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL OUTER JOIN"], ans:2, exp:"INNER JOIN returns only rows where there is a match in BOTH tables. LEFT JOIN = all from left + matching from right." },
      { q:"A Foreign Key in one table references the ______ of another table.", opts:["Any column","Foreign Key","Primary Key","Index column"], ans:2, exp:"A Foreign Key is a column that references the Primary Key of another table, establishing a referential relationship between the two tables." },
      { q:"The TCP/IP model has how many layers?", opts:["7","5","3","4"], ans:3, exp:"TCP/IP model has 4 layers: Network Access (Link), Internet, Transport, Application. Compared to OSI's 7 layers." },
      { q:"Which normal form requires all values to be atomic (indivisible)?", opts:["2NF","BCNF","3NF","1NF"], ans:3, exp:"1NF (First Normal Form) requires all column values to be atomic — no repeating groups, no arrays, no comma-separated values in a single cell." },
      { q:"The OSI layer that deals with encryption and data compression is ______.", opts:["Application (Layer 7)","Transport (Layer 4)","Session (Layer 5)","Presentation (Layer 6)"], ans:3, exp:"The Presentation Layer (Layer 6) handles data translation, encryption/decryption (SSL/TLS), and compression (JPEG, MPEG)." }
    ]
  }
    title: "Computer Generations",
    icon:  "📅",
    color: "#F43F5E",
    questions: [
      { q:"Which technology was used in 2nd generation computers?", opts:["Vacuum Tubes","Transistors","Integrated Circuits","Microprocessors"], ans:1, exp:"2nd generation (1956-1963) used Transistors — smaller, faster, more reliable, and generating less heat than vacuum tubes." },
      { q:"ENIAC belongs to which generation?", opts:["Second","Third","First","Fourth"], ans:2, exp:"ENIAC (1945) belongs to the 1st Generation — built using vacuum tubes, it was one of the first electronic computers." },
      { q:"Who invented the Integrated Circuit?", opts:["Gordon Moore","Alan Turing","Charles Babbage","Jack Kilby"], ans:3, exp:"Jack Kilby (Texas Instruments, 1958) invented the IC. He received the Nobel Prize in Physics in 2000 for this invention." },
      { q:"4th generation computers use ______.", opts:["Vacuum Tubes","Transistors","ICs only","Microprocessors (VLSI)"], ans:3, exp:"4th generation uses Microprocessors based on VLSI (Very Large Scale Integration) — millions of transistors on one chip." },
      { q:"Moore's Law was stated by ______.", opts:["Bill Gates","Steve Jobs","Gordon Moore","Jack Kilby"], ans:2, exp:"Gordon Moore (co-founder of Intel) stated in 1965 that transistor count on chips would double approximately every 2 years." },
      { q:"Which language was used in 1st generation computers?", opts:["Assembly Language","High-Level Language","Machine Language","4GL"], ans:2, exp:"1st generation programming was done only in Machine Language (0s and 1s) — there were no assemblers or compilers." },
      { q:"The 3rd generation computers were characterized by ______.", opts:["Transistors","Vacuum Tubes","Artificial Intelligence","Integrated Circuits (ICs)"], ans:3, exp:"3rd generation (1963-1971) used Integrated Circuits (ICs) — multiple transistors on a single silicon chip." },
      { q:"5th generation computers are based on ______.", opts:["VLSI technology","Transistors","Artificial Intelligence (AI) and ULSI","ICs"], ans:2, exp:"5th generation computers use AI, Machine Learning, NLP, and ULSI (Ultra Large Scale Integration) with billions of transistors." },
      { q:"Which was the first commercial computer sold to a business?", opts:["ENIAC","EDVAC","IBM 360","UNIVAC I"], ans:3, exp:"UNIVAC I (1951) was the first commercial computer sold to a business — the US Census Bureau purchased it." },
      { q:"ULSI stands for ______.", opts:["Ultra Large Scale Integration","Universal Large Scale Integration","Ultra Level System Interface","Ultra Long Scale Integration"], ans:0, exp:"ULSI = Ultra Large Scale Integration — placing billions of transistors on a single chip, used in 5th generation processors." },
      { q:"Which generation introduced HIGH-LEVEL programming languages?", opts:["First","Second","Third","Fourth"], ans:2, exp:"3rd generation introduced high-level languages like FORTRAN, COBOL, BASIC, and Pascal — making programming much easier." },
      { q:"The transistor was invented at which laboratory?", opts:["MIT Labs","NASA","Bell Labs","IBM Research"], ans:2, exp:"The transistor was invented at Bell Telephone Laboratories in 1947 by William Shockley, John Bardeen, and Walter Brattain." },
      { q:"Which speed unit is associated with 3rd generation computers?", opts:["Milliseconds","Microseconds","Nanoseconds","Picoseconds"], ans:2, exp:"3rd generation computers operated in nanoseconds (10⁻⁹ seconds). 1st=milliseconds, 2nd=microseconds, 4th=picoseconds." },
      { q:"Magnetic Drum memory was used in which generation?", opts:["First","Second","Third","Fourth"], ans:0, exp:"1st generation computers used Magnetic Drum memory for storage — rotating cylinders coated with magnetic material." },
      { q:"The IBM System/360 belongs to which generation?", opts:["First","Second","Third","Fourth"], ans:2, exp:"IBM System/360 (1964) belongs to the 3rd generation — it used Integrated Circuits and was a revolutionary mainframe family." },
      { q:"The assembly language was introduced in ______ generation.", opts:["First","Second","Third","Fourth"], ans:1, exp:"Assembly Language was introduced in the 2nd generation — a step up from machine language, using mnemonics (ADD, MOV, SUB)." },
      { q:"How many transistors did the first Intel 4004 microprocessor have?", opts:["10,000","23,000","2,300","100,000"], ans:2, exp:"Intel 4004 (1971) had 2,300 transistors. Modern Apple M3 has 35 billion — Moore's Law in action over 50 years." },
      { q:"The 4th generation saw the birth of ______.", opts:["Vacuum tubes","Punched card input","Personal Computers (PCs) for home use","Only mainframe computers"], ans:2, exp:"The 4th generation (1971-present) saw Personal Computers become affordable and available to home users for the first time." },
      { q:"Quantum computing research belongs to ______ generation.", opts:["Third","Second","Fourth","Fifth"], ans:3, exp:"Quantum computing is associated with 5th generation computing — a revolutionary approach using quantum mechanics for computation." },
      { q:"Which Indian computer was developed in early generations?", opts:["TIFRAC","PARAM","ARYABHATA","MANGALYAAN"], ans:0, exp:"TIFRAC (Tata Institute of Fundamental Research Automatic Calculator) was India's first computer, developed in the 1960s (3rd generation)." },
      { q:"The 2nd generation replaced vacuum tubes with ______.", opts:["ICs","Microprocessors","Transistors","VLSI chips"], ans:2, exp:"Transistors replaced vacuum tubes in the 2nd generation — they were smaller, used less power, were more reliable and faster." },
      { q:"Which generation introduced the concept of GUI?", opts:["Second","Third","Fourth","Fifth"], ans:2, exp:"The 4th generation introduced GUI (Graphical User Interface) — making computers user-friendly with windows, icons, and mouse." },
      { q:"IBM 701 belongs to which computer generation?", opts:["First","Second","Third","Fourth"], ans:0, exp:"IBM 701 (1952) is a 1st generation computer that used vacuum tubes. It was IBM's first commercial scientific computer." },
      { q:"The speed of 5th generation computers is measured in ______.", opts:["Milliseconds","Nanoseconds","Femtoseconds","Microseconds"], ans:2, exp:"5th generation computers operate at femtosecond (10⁻¹⁵ seconds) speeds, compared to 1st gen's milliseconds." },
      { q:"Natural Language Processing (NLP) is a feature of ______ generation.", opts:["Second","Third","Fourth","Fifth"], ans:3, exp:"NLP (Natural Language Processing) — enabling computers to understand human language — is a 5th generation feature (e.g., Siri, Alexa, ChatGPT)." }
    ]
  }
};

// ═══════════════════════════════════════════════════════════
// QUIZ ENGINE STATE
// ═══════════════════════════════════════════════════════════
let state = {
  moduleId:      null,
  studentName:   '',
  questions:     [],
  current:       0,
  answers:       {},   // { questionIndex: chosenOptionIndex }
  startTime:     null,
  timerInterval: null,
  elapsed:       0,
  submitted:     false
};

// ── Helpers ──────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function getGrade(pct) {
  if (pct >= 90) return { letter: 'A+', label: 'Outstanding!',  color: '#10B981', emoji: '🏆' };
  if (pct >= 80) return { letter: 'A',  label: 'Excellent!',    color: '#3B5BDB', emoji: '🎉' };
  if (pct >= 70) return { letter: 'B',  label: 'Good Job!',     color: '#0EA5E9', emoji: '👍' };
  if (pct >= 60) return { letter: 'C',  label: 'Average',       color: '#F59E0B', emoji: '📚' };
  if (pct >= 40) return { letter: 'D',  label: 'Needs Work',    color: '#F97316', emoji: '💪' };
  return              { letter: 'F',  label: 'Keep Studying!', color: '#F43F5E', emoji: '📖' };
}

function getPerfMessage(pct, name) {
  if (pct >= 90) return `🏆 Brilliant, ${name}! You scored ${pct}% — you have an exceptional understanding of Computer Fundamentals. You're fully exam-ready!`;
  if (pct >= 80) return `🎉 Excellent work, ${name}! ${pct}% is a strong score. You understand most concepts well. Review the questions you missed to aim for A+.`;
  if (pct >= 70) return `👍 Good job, ${name}! ${pct}% shows solid understanding. A bit more revision of the weaker areas will push you into the A grade.`;
  if (pct >= 60) return `📚 Not bad, ${name}! ${pct}% is a pass but there's room to improve. Focus on the topics where you made errors.`;
  if (pct >= 40) return `💪 Keep going, ${name}! ${pct}% — you're getting there. Re-read the topic pages and attempt the quiz again.`;
  return `📖 Don't give up, ${name}! ${pct}% — Computer Fundamentals can be challenging at first. Go through each topic page carefully and try again!`;
}

// ═══════════════════════════════════════════════════════════
// MODULE SELECTION
// ═══════════════════════════════════════════════════════════
function initModuleCards() {
  const grid = document.getElementById('moduleGrid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.entries(QUESTION_BANK).forEach(([id, mod]) => {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-lg-4';
    card.innerHTML = `
      <div class="module-card" data-module="${id}" onclick="selectModule('${id}')">
        <div class="module-q-count">${mod.questions.length} Qs</div>
        <span class="module-icon">${mod.icon}</span>
        <div class="module-title">${mod.title}</div>
        <div class="module-meta" style="color:${mod.color}">● ${mod.questions.length} Questions · ~${Math.ceil(mod.questions.length * 1.2)} min</div>
      </div>`;
    grid.appendChild(card);
  });
}

function selectModule(id) {
  document.querySelectorAll('.module-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.module-card[data-module="${id}"]`)?.classList.add('selected');
  state.moduleId = id;
  document.getElementById('startBtn').disabled = false;
  const mod = QUESTION_BANK[id];
  document.getElementById('selectedModuleInfo').innerHTML =
    `<span style="color:${mod.color}">${mod.icon} ${mod.title}</span> selected — ${mod.questions.length} questions`;
  document.getElementById('selectedModuleInfo').style.display = 'block';
}

// ═══════════════════════════════════════════════════════════
// START QUIZ
// ═══════════════════════════════════════════════════════════
function startQuiz() {
  const nameEl = document.getElementById('studentName');
  const name   = nameEl.value.trim();
  if (!name) { nameEl.focus(); nameEl.style.borderColor = 'var(--accent-rose)'; return; }
  nameEl.style.borderColor = '';
  if (!state.moduleId) { alert('Please select a module first!'); return; }

  const mod      = QUESTION_BANK[state.moduleId];
  state.studentName = name;
  state.questions   = shuffle(mod.questions);
  state.current     = 0;
  state.answers     = {};
  state.submitted   = false;
  state.elapsed     = 0;
  state.startTime   = Date.now();

  document.getElementById('setupSection').style.display  = 'none';
  document.getElementById('quizArena').style.display     = 'block';
  document.getElementById('resultSection').style.display = 'none';

  startTimer();
  renderQuestion();
  renderQMap();
}

// ═══════════════════════════════════════════════════════════
// TIMER
// ═══════════════════════════════════════════════════════════
function startTimer() {
  clearInterval(state.timerInterval);
  const el = document.getElementById('quizTimer');
  state.timerInterval = setInterval(() => {
    state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    el.textContent = formatTime(state.elapsed);
    el.parentElement.classList.toggle('warning', state.elapsed > (state.questions.length * 60) * 0.8);
  }, 1000);
}

// ═══════════════════════════════════════════════════════════
// RENDER QUESTION
// ═══════════════════════════════════════════════════════════
function renderQuestion() {
  const q    = state.questions[state.current];
  const idx  = state.current;
  const total = state.questions.length;
  const answered = state.answers[idx] !== undefined;
  const chosen   = state.answers[idx];

  // Progress bar
  const pct = Math.round(((idx + 1) / total) * 100);
  document.getElementById('quizProgressFill').style.width = pct + '%';
  document.getElementById('quizProgressLabel').textContent = `Question ${idx + 1} of ${total}`;
  document.getElementById('quizProgressPct').textContent   = `${Object.keys(state.answers).length} answered`;

  // Build question HTML
  const optionsHtml = q.opts.map((opt, i) => {
    let cls = 'answer-option';
    let icon = '';
    if (answered) {
      cls += ' answered';
      if (i === q.ans) { cls += ' correct'; icon = '<i class="bi bi-check-circle-fill opt-icon" style="color:var(--accent-emerald)"></i>'; }
      else if (i === chosen && i !== q.ans) { cls += ' wrong'; icon = '<i class="bi bi-x-circle-fill opt-icon" style="color:var(--accent-rose)"></i>'; }
    } else if (i === chosen) {
      cls += ' selected';
    }
    return `<div class="${cls}" onclick="chooseAnswer(${i})">
      <span class="opt-label">${String.fromCharCode(65+i)}</span>
      <span class="opt-text">${opt}</span>
      ${icon}
    </div>`;
  }).join('');

  const explHtml = answered
    ? `<div class="explanation-box visible"><div class="explanation-label"><i class="bi bi-info-circle me-1"></i>Explanation</div>${q.exp}</div>`
    : '';

  const isLast = idx === total - 1;

  document.getElementById('questionContainer').innerHTML = `
    <div class="question-card">
      <div class="q-number-badge"><i class="bi bi-question-circle-fill"></i> Question ${idx + 1} of ${total}</div>
      <div class="question-text">${q.q}</div>
      <div class="options-wrap">${optionsHtml}</div>
      ${explHtml}
    </div>
    <div class="quiz-nav">
      <button class="btn-quiz-nav btn-prev" onclick="prevQuestion()" ${idx === 0 ? 'style="visibility:hidden"' : ''}>
        <i class="bi bi-arrow-left"></i> Previous
      </button>
      ${isLast
        ? `<button class="btn-quiz-nav btn-submit" onclick="confirmSubmit()"><i class="bi bi-send-check-fill"></i> Submit Quiz</button>`
        : `<button class="btn-quiz-nav btn-next" onclick="nextQuestion()">Next <i class="bi bi-arrow-right"></i></button>`
      }
    </div>`;

  updateQMap();
}

// ═══════════════════════════════════════════════════════════
// ANSWER SELECTION
// ═══════════════════════════════════════════════════════════
function chooseAnswer(optIdx) {
  if (state.answers[state.current] !== undefined) return; // already answered
  state.answers[state.current] = optIdx;
  renderQuestion();
  updateQMap();
}

function nextQuestion() {
  if (state.current < state.questions.length - 1) { state.current++; renderQuestion(); }
}
function prevQuestion() {
  if (state.current > 0) { state.current--; renderQuestion(); }
}

// ── Question Map ─────────────────────────────────────────
function renderQMap() {
  const map = document.getElementById('questionMap');
  if (!map) return;
  map.innerHTML = `<div class="q-map-label">Question Navigator</div>`;
  state.questions.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'q-dot';
    dot.textContent = i + 1;
    dot.dataset.qi  = i;
    dot.onclick = () => { state.current = i; renderQuestion(); };
    map.appendChild(dot);
  });
}

function updateQMap() {
  state.questions.forEach((q, i) => {
    const dot = document.querySelector(`.q-dot[data-qi="${i}"]`);
    if (!dot) return;
    dot.className = 'q-dot';
    if (i === state.current)          dot.classList.add('current');
    else if (state.answers[i] !== undefined) {
      const correct = state.answers[i] === state.questions[i].ans;
      dot.classList.add(correct ? 'answered-c' : 'answered-w');
    }
  });
}

// ═══════════════════════════════════════════════════════════
// SUBMIT
// ═══════════════════════════════════════════════════════════
function confirmSubmit() {
  const unanswered = state.questions.length - Object.keys(state.answers).length;
  if (unanswered > 0) {
    if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
  }
  submitQuiz();
}

function submitQuiz() {
  clearInterval(state.timerInterval);
  state.submitted = true;

  // Calculate score
  let correct = 0;
  state.questions.forEach((q, i) => {
    if (state.answers[i] === q.ans) correct++;
  });
  const total    = state.questions.length;
  const wrong    = Object.keys(state.answers).length - correct;
  const skipped  = total - Object.keys(state.answers).length;
  const pct      = Math.round((correct / total) * 100);
  const grade    = getGrade(pct);
  const timeTaken = formatTime(state.elapsed);

  // Save to localStorage
  try {
    const history = JSON.parse(localStorage.getItem('cf_quiz_history') || '[]');
    history.unshift({
      module: state.moduleId, name: state.studentName,
      score: correct, total, pct, grade: grade.letter,
      date: new Date().toLocaleDateString('en-IN'), time: timeTaken
    });
    localStorage.setItem('cf_quiz_history', JSON.stringify(history.slice(0, 20)));
  } catch(e) {}

  document.getElementById('quizArena').style.display     = 'none';
  document.getElementById('resultSection').style.display = 'block';

  renderResult({ correct, wrong, skipped, total, pct, grade, timeTaken });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════
// RENDER RESULT
// ═══════════════════════════════════════════════════════════
function renderResult({ correct, wrong, skipped, total, pct, grade, timeTaken }) {
  const circumference = 2 * Math.PI * 70; // r=70
  const offset = circumference - (pct / 100) * circumference;
  const mod = QUESTION_BANK[state.moduleId];

  document.getElementById('resultSection').innerHTML = `
    <div class="result-card mb-4">
      <h2 style="font-family:var(--font-display);font-size:1.6rem;font-weight:700;margin-bottom:6px">Quiz Completed! ${grade.emoji}</h2>
      <p style="color:var(--text-muted);margin-bottom:28px">
        ${mod.icon} ${mod.title} &nbsp;·&nbsp; ${state.studentName} &nbsp;·&nbsp;
        ${new Date().toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'})}
      </p>

      <!-- Score Circle -->
      <div class="score-circle-wrap">
        <svg class="score-circle-svg" width="160" height="160" viewBox="0 0 160 160">
          <circle class="score-circle-bg" cx="80" cy="80" r="70"/>
          <circle class="score-circle-fill" id="scoreArc" cx="80" cy="80" r="70"
            stroke="${grade.color}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${circumference}"/>
        </svg>
        <div class="score-circle-text">
          <div class="score-pct" id="animPct" style="color:${grade.color}">0%</div>
          <div class="score-label">${correct}/${total} correct</div>
        </div>
      </div>

      <!-- Grade Badge -->
      <div class="grade-badge" style="background:${grade.color}20;border:2px solid ${grade.color};color:${grade.color}">
        <span style="font-size:2rem">${grade.emoji}</span>
        Grade ${grade.letter} — ${grade.label}
      </div>

      <!-- Stats -->
      <div class="result-stats">
        <div class="result-stat">
          <div class="rs-val" style="color:var(--accent-emerald)">${correct}</div>
          <div class="rs-label">✅ Correct</div>
        </div>
        <div class="result-stat">
          <div class="rs-val" style="color:var(--accent-rose)">${wrong}</div>
          <div class="rs-label">❌ Wrong</div>
        </div>
        <div class="result-stat">
          <div class="rs-val" style="color:var(--accent-amber)">${skipped}</div>
          <div class="rs-label">⏭ Skipped</div>
        </div>
        <div class="result-stat">
          <div class="rs-val" style="color:var(--accent-blue)">${pct}%</div>
          <div class="rs-label">📊 Score</div>
        </div>
        <div class="result-stat">
          <div class="rs-val" style="color:var(--text-primary);font-size:1.1rem">${timeTaken}</div>
          <div class="rs-label">⏱ Time</div>
        </div>
      </div>

      <!-- Performance Message -->
      <div class="perf-msg">${getPerfMessage(pct, state.studentName)}</div>

      <!-- Action Buttons -->
      <div class="result-actions">
        <button class="btn-action btn-pdf" onclick="downloadPDF()">
          <i class="bi bi-file-earmark-pdf-fill"></i> Download PDF Report
        </button>
        <button class="btn-action btn-retry" onclick="retryQuiz()">
          <i class="bi bi-arrow-counterclockwise"></i> Retry Quiz
        </button>
        <a href="../index.html" class="btn-action btn-home">
          <i class="bi bi-house-fill"></i> Back to Home
        </a>
      </div>
    </div>

    <!-- Answer Review -->
    <div class="content-section">
      <div class="cs-header mb-4">
        <div class="cs-icon icon-blue"><i class="bi bi-list-check"></i></div>
        <div><div class="cs-title">Answer Review</div><div class="cs-subtitle">See every question with correct answers</div></div>
      </div>
      ${state.questions.map((q, i) => {
        const chosen  = state.answers[i];
        const isRight = chosen === q.ans;
        const wasSkipped = chosen === undefined;
        return `
        <div class="review-card" style="border-left:3px solid ${wasSkipped ? 'var(--accent-amber)' : isRight ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
          <div class="review-q">
            <span style="color:${wasSkipped ? 'var(--accent-amber)' : isRight ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
              ${wasSkipped ? '⏭' : isRight ? '✅' : '❌'}
            </span>
            &nbsp;Q${i+1}. ${q.q}
          </div>
          ${!wasSkipped ? `<div class="review-your" style="color:${isRight ? 'var(--accent-emerald)' : 'var(--accent-rose)'}">
            Your answer: ${q.opts[chosen]}
          </div>` : `<div class="review-your" style="color:var(--accent-amber)">Skipped</div>`}
          ${!isRight || wasSkipped ? `<div class="review-correct">✓ Correct: ${q.opts[q.ans]}</div>` : ''}
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:6px;padding-top:6px;border-top:1px solid var(--border-color)">
            <i class="bi bi-info-circle me-1"></i>${q.exp}
          </div>
        </div>`;
      }).join('')}
    </div>`;

  // Animate score circle and percentage counter
  setTimeout(() => {
    const arc = document.getElementById('scoreArc');
    const pctEl = document.getElementById('animPct');
    if (arc) arc.style.strokeDashoffset = offset;
    if (pctEl) {
      let count = 0;
      const step = pct / 60;
      const interval = setInterval(() => {
        count = Math.min(count + step, pct);
        pctEl.textContent = Math.round(count) + '%';
        if (count >= pct) clearInterval(interval);
      }, 16);
    }
  }, 200);
}

// ═══════════════════════════════════════════════════════════
// RETRY
// ═══════════════════════════════════════════════════════════
function retryQuiz() {
  document.getElementById('resultSection').style.display = 'none';
  document.getElementById('setupSection').style.display  = 'block';
}

// ═══════════════════════════════════════════════════════════
// PDF EXPORT (using jsPDF CDN)
// ═══════════════════════════════════════════════════════════
async function downloadPDF() {
  const btn = document.querySelector('.btn-pdf');
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Generating...';
  btn.disabled = true;

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });

    const mod    = QUESTION_BANK[state.moduleId];
    const total  = state.questions.length;
    let correct  = 0;
    state.questions.forEach((q,i) => { if (state.answers[i] === q.ans) correct++; });
    const pct    = Math.round((correct / total) * 100);
    const grade  = getGrade(pct);
    const date   = new Date().toLocaleDateString('en-IN', {day:'numeric',month:'long',year:'numeric'});

    const W = 210; // A4 width mm

    // ── Header gradient bar ──
    doc.setFillColor(59, 91, 219);
    doc.rect(0, 0, W, 40, 'F');

    // ── Logo text ──
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20); doc.setTextColor(255,255,255);
    doc.text('CompFund', 15, 18);
    doc.setFontSize(10); doc.setFont('helvetica','normal');
    doc.text('Computer Fundamentals Learning Platform', 15, 26);

    // ── Grade circle (right side) ──
    const gradeColors = { 'A+':'#10B981','A':'#3B5BDB','B':'#0EA5E9','C':'#F59E0B','D':'#F97316','F':'#F43F5E' };
    const [r,g,b] = hexToRgb(gradeColors[grade.letter] || '#3B5BDB');
    doc.setFillColor(r,g,b);
    doc.circle(W-25, 20, 15, 'F');
    doc.setFont('helvetica','bold'); doc.setFontSize(14); doc.setTextColor(255,255,255);
    doc.text(grade.letter, W-25, 24.5, { align:'center' });

    // ── Report title ──
    doc.setTextColor(30,30,30); doc.setFont('helvetica','bold');
    doc.setFontSize(16); doc.text('QUIZ RESULT REPORT', W/2, 56, { align:'center' });
    doc.setFontSize(11); doc.setFont('helvetica','normal');
    doc.setTextColor(100,100,100);
    doc.text(`${mod.icon} ${mod.title}`, W/2, 64, { align:'center' });

    // ── Divider ──
    doc.setDrawColor(220,220,220); doc.setLineWidth(0.5);
    doc.line(15, 68, W-15, 68);

    // ── Student Info Table ──
    let y = 76;
    const infoRows = [
      ['Student Name', state.studentName],
      ['Module', mod.title],
      ['Date', date],
      ['Time Taken', formatTime(state.elapsed)],
    ];
    infoRows.forEach(([label,val]) => {
      doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(80,80,80);
      doc.text(label + ':', 20, y);
      doc.setFont('helvetica','normal'); doc.setTextColor(30,30,30);
      doc.text(val, 70, y);
      y += 8;
    });

    // ── Score Box ──
    y += 4;
    doc.setFillColor(240,244,255); doc.setDrawColor(59,91,219); doc.setLineWidth(0.8);
    doc.roundedRect(15, y, W-30, 38, 4, 4, 'FD');

    const half = (W-30)/2;
    const scoreItems = [
      ['SCORE', `${correct} / ${total}`, 33, 80],
      ['PERCENTAGE', `${pct}%`, 33, 120],
      ['GRADE', grade.letter, 33, 160],
      ['RESULT', pct >= 40 ? 'PASS':'FAIL', 33, 200],
    ];
    scoreItems.forEach(([lbl, val, localY, colorR], i) => {
      const x = 20 + (i * 44);
      if (x > W-15) return;
      doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(100,100,100);
      doc.text(lbl, x, y+10);
      doc.setFont('helvetica','bold'); doc.setFontSize(13);
      doc.setTextColor(59,91,219);
      doc.text(String(val), x, y+22);
    });
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(80,80,80);
    doc.text('Score', 20, y+10); doc.setFontSize(14); doc.setTextColor(59,91,219); doc.text(`${correct}/${total}`, 20, y+22);
    doc.setFontSize(8); doc.text('Percentage', 60, y+10); doc.setFontSize(14); doc.text(`${pct}%`, 60, y+22);
    doc.setFontSize(8); doc.text('Grade', 110, y+10); doc.setFontSize(14); doc.setTextColor(r,g,b); doc.text(grade.letter, 110, y+22);
    doc.setFontSize(8); doc.setTextColor(80,80,80); doc.text('Status', 150, y+10);
    doc.setFontSize(12);
    if (pct >= 40) { doc.setTextColor(16,185,129); doc.text('PASS ✓', 150, y+22); }
    else           { doc.setTextColor(244,63,94);   doc.text('FAIL ✗', 150, y+22); }

    y += 48;

    // ── Performance Message ──
    doc.setFont('helvetica','italic'); doc.setFontSize(9); doc.setTextColor(80,80,80);
    const msg = getPerfMessage(pct, state.studentName);
    const msgLines = doc.splitTextToSize(msg, W-30);
    doc.text(msgLines, 15, y); y += msgLines.length * 5 + 8;

    // ── Answer summary ──
    doc.setDrawColor(220,220,220); doc.line(15, y, W-15, y); y += 8;
    doc.setFont('helvetica','bold'); doc.setFontSize(11); doc.setTextColor(30,30,30);
    doc.text('Answer Summary', 15, y); y += 10;

    state.questions.forEach((q, i) => {
      if (y > 270) { doc.addPage(); y = 20; }
      const chosen   = state.answers[i];
      const isRight  = chosen === q.ans;
      const skipped  = chosen === undefined;
      doc.setFont('helvetica','bold'); doc.setFontSize(8.5);
      doc.setTextColor(isRight ? 16 : skipped ? 200 : 220, isRight ? 185 : 160, isRight ? 129 : 30);
      const prefix = isRight ? '✓' : skipped ? '○' : '✗';
      const qText = doc.splitTextToSize(`${prefix} Q${i+1}. ${q.q}`, W-30);
      doc.text(qText, 15, y); y += qText.length * 5;
      doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
      doc.setTextColor(80,80,80);
      if (!skipped) doc.text(`   Your answer: ${q.opts[chosen]}`, 15, y);
      else doc.text('   (Skipped)', 15, y);
      y += 5;
      if (!isRight || skipped) {
        doc.setTextColor(16,185,129);
        doc.text(`   Correct: ${q.opts[q.ans]}`, 15, y); y += 5;
      }
      y += 2;
    });

    // ── Footer ──
    const pages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p);
      doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(150,150,150);
      doc.text('CompFund — Computer Fundamentals Learning Platform | compfund.edu', W/2, 292, { align:'center' });
      doc.text(`Page ${p} of ${pages}`, W-15, 292, { align:'right' });
    }

    doc.save(`CompFund_Result_${state.studentName.replace(/\s+/g,'_')}_${state.moduleId}.pdf`);
  } catch(err) {
    console.error(err);
    alert('PDF generation failed. Please try again.');
  }

  btn.innerHTML = '<i class="bi bi-file-earmark-pdf-fill"></i> Download PDF Report';
  btn.disabled = false;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initModuleCards();
  const nameEl = document.getElementById('studentName');
  if (nameEl) nameEl.addEventListener('input', () => { nameEl.style.borderColor = ''; });
});
