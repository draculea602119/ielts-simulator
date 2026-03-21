/* ================================================
   IELTS Simulator — Test Data
   25 Academic Mock Tests
   ================================================ */

const TESTS = [

// ─────────────────────────────────────────────
// TEST 1 — Technology & Innovation
// ─────────────────────────────────────────────
{
  id: 1, topic: "Technology & Innovation",
  listening: { sections: [
    { description: "A conversation between two students about a science project",
      transcript: "Tutor: So, let's talk about your project on renewable energy. Student A: We're focusing on solar panels, specifically the efficiency improvements over the last decade. Tutor: Good. What data have you collected so far? Student A: We have statistics showing that panel efficiency has risen from about 15% in 2010 to nearly 23% today. Student B: And we're comparing three manufacturers — SunTech, GreenWatt, and SolarMax. Tutor: Have you considered cost per kilowatt-hour? Student B: Yes, SolarMax is the cheapest at $0.04 per kilowatt-hour. Tutor: Excellent. When do you plan to submit? Student A: By the 15th of March. Tutor: Make sure you include a bibliography with at least eight sources.",
      questions: [
        { num:1, type:"fill", question:"The students' project focuses on _______ panels.", answer:"solar" },
        { num:2, type:"fill", question:"Current panel efficiency is approximately _______% today.", answer:"23" },
        { num:3, type:"mc", question:"How many manufacturers are being compared?", options:["A. Two","B. Three","C. Four","D. Five"], answer:"B" },
        { num:4, type:"fill", question:"SolarMax's cost per kilowatt-hour is $_______.", answer:"0.04" },
        { num:5, type:"fill", question:"The project submission deadline is the _______ of March.", answer:"15th" },
        { num:6, type:"mc", question:"What must the bibliography contain?", options:["A. At least five sources","B. At least six sources","C. At least eight sources","D. At least ten sources"], answer:"C" },
        { num:7, type:"fill", question:"Panel efficiency in 2010 was about _______% .", answer:"15" },
        { num:8, type:"mc", question:"Which manufacturer is described as cheapest?", options:["A. SunTech","B. GreenWatt","C. SolarMax","D. EcoPanel"], answer:"C" },
        { num:9, type:"fill", question:"The conversation is between two _______ and a tutor.", answer:"students" },
        { num:10, type:"mc", question:"The project is primarily about which topic?", options:["A. Wind energy","B. Nuclear power","C. Renewable energy","D. Fossil fuels"], answer:"C" }
      ]
    },
    { description: "A radio interview about artificial intelligence in healthcare",
      transcript: "Host: Welcome back. Today we're speaking with Dr. Lena Hart about AI in medicine. Dr. Hart: Thanks for having me. AI is transforming diagnostics — particularly in radiology, where algorithms can detect tumours with 94% accuracy. Host: That's remarkable. What are the limitations? Dr. Hart: The main concern is data privacy. Patient records must be protected under GDPR regulations. Also, AI systems require enormous datasets — typically over one million images — to train effectively. Host: Is this technology available now? Dr. Hart: Yes, three hospitals in London are currently piloting the system. Host: When do you expect widespread adoption? Dr. Hart: Probably within five years, by 2029.",
      questions: [
        { num:11, type:"fill", question:"AI can detect tumours with _______% accuracy.", answer:"94" },
        { num:12, type:"fill", question:"Patient data must be protected under _______ regulations.", answer:"GDPR" },
        { num:13, type:"fill", question:"AI systems need over _______ million images to train.", answer:"one" },
        { num:14, type:"mc", question:"How many hospitals are currently piloting the system?", options:["A. One","B. Two","C. Three","D. Four"], answer:"C" },
        { num:15, type:"fill", question:"The hospitals are located in _______.", answer:"London" },
        { num:16, type:"mc", question:"When does Dr. Hart expect widespread adoption?", options:["A. 2026","B. 2027","C. 2028","D. 2029"], answer:"D" },
        { num:17, type:"fill", question:"Dr. Hart's specialty area is _______.", answer:"radiology" },
        { num:18, type:"mc", question:"What is described as the main concern about AI in medicine?", options:["A. Cost","B. Data privacy","C. Accuracy","D. Training time"], answer:"B" },
        { num:19, type:"fill", question:"The interviewer's name is _______.", answer:"Host" },
        { num:20, type:"mc", question:"AI is described as transforming which medical process?", options:["A. Surgery","B. Diagnostics","C. Pharmacy","D. Rehabilitation"], answer:"B" }
      ]
    },
    { description: "A lecture on the history of the internet",
      transcript: "Professor: The internet's origins trace back to 1969, when ARPANET connected four universities in the United States. By 1991, Tim Berners-Lee invented the World Wide Web, making the internet publicly accessible. The number of internet users reached one billion by 2005, and today there are over five billion users worldwide. The fastest growth occurred in Asia, particularly China and India. Mobile internet access now accounts for 60% of all web traffic globally. Future development will focus on the Internet of Things — connecting everyday devices. Experts predict 75 billion connected devices by 2025.",
      questions: [
        { num:21, type:"fill", question:"ARPANET was created in _______.", answer:"1969" },
        { num:22, type:"fill", question:"The World Wide Web was invented by _______.", answer:"Tim Berners-Lee" },
        { num:23, type:"fill", question:"The internet became publicly accessible in _______.", answer:"1991" },
        { num:24, type:"mc", question:"When did internet users reach one billion?", options:["A. 2000","B. 2003","C. 2005","D. 2008"], answer:"C" },
        { num:25, type:"fill", question:"Today there are over _______ billion internet users.", answer:"five" },
        { num:26, type:"mc", question:"Where did the fastest internet growth occur?", options:["A. Europe","B. North America","C. Africa","D. Asia"], answer:"D" },
        { num:27, type:"fill", question:"Mobile internet accounts for _______% of web traffic.", answer:"60" },
        { num:28, type:"fill", question:"Future focus will be on the Internet of _______.", answer:"Things" },
        { num:29, type:"mc", question:"How many connected devices are predicted by 2025?", options:["A. 50 billion","B. 60 billion","C. 75 billion","D. 100 billion"], answer:"C" },
        { num:30, type:"fill", question:"ARPANET initially connected _______ universities.", answer:"four" }
      ]
    },
    { description: "A discussion about smartphone addiction among teenagers",
      transcript: "Researcher: Our study surveyed 2,000 teenagers aged 13 to 18 in the UK. We found that 78% check their phones within five minutes of waking up. On average, teens spend six hours daily on their devices, with social media accounting for roughly half of that time. The most popular platform is currently TikTok, followed by Instagram. Concerningly, 45% of participants reported that phone use negatively affected their sleep. Schools in Finland have completely banned phones during lessons, resulting in a 12% improvement in test scores. Parent-set screen time limits were found to be effective in only 30% of cases.",
      questions: [
        { num:31, type:"fill", question:"The study surveyed _______ teenagers.", answer:"2,000" },
        { num:32, type:"fill", question:"_______% of teens check phones within five minutes of waking.", answer:"78" },
        { num:33, type:"fill", question:"Teens spend an average of _______ hours daily on devices.", answer:"six" },
        { num:34, type:"mc", question:"What accounts for roughly half of daily device time?", options:["A. Gaming","B. Video streaming","C. Social media","D. Messaging"], answer:"C" },
        { num:35, type:"fill", question:"The most popular platform among teens is _______.", answer:"TikTok" },
        { num:36, type:"mc", question:"What percentage reported phones negatively affected sleep?", options:["A. 35%","B. 45%","C. 55%","D. 65%"], answer:"B" },
        { num:37, type:"fill", question:"Schools in _______ have completely banned phones during lessons.", answer:"Finland" },
        { num:38, type:"fill", question:"The phone ban resulted in a _______% improvement in test scores.", answer:"12" },
        { num:39, type:"mc", question:"The second most popular social platform is:", options:["A. Facebook","B. Snapchat","C. Instagram","D. YouTube"], answer:"C" },
        { num:40, type:"fill", question:"Parent-set limits were effective in only _______% of cases.", answer:"30" }
      ]
    }
  ]},
  reading: { passages: [
    { title: "The Fourth Industrial Revolution",
      text: `<p><span class='para-label'>A</span>The Fourth Industrial Revolution, a term coined by Klaus Schwab, founder of the World Economic Forum, describes the current era of technological advancement that builds upon the Third Industrial Revolution (the digital revolution) but is distinguished by its fusion of technologies that blur the lines between physical, digital, and biological spheres. Unlike the previous three industrial revolutions, the Fourth is evolving at an exponential rather than a linear pace.</p>
<p><span class='para-label'>B</span>Key technologies driving this revolution include artificial intelligence, robotics, the Internet of Things (IoT), autonomous vehicles, 3D printing, nanotechnology, biotechnology, and quantum computing. These technologies are not developing in isolation; rather, they are converging and interacting with one another in ways that amplify their individual impacts.</p>
<p><span class='para-label'>C</span>The economic implications are profound. McKinsey Global Institute estimates that automation could displace between 400 million and 800 million workers globally by 2030. However, new jobs will also emerge — the World Economic Forum predicts that 97 million new roles will be created that are better suited to the new division of labour between humans and machines.</p>
<p><span class='para-label'>D</span>Critics argue that the benefits of the Fourth Industrial Revolution are not evenly distributed. The gap between high-skilled and low-skilled workers is widening, and developing nations risk being left further behind as technology clusters in wealthy countries. Oxfam reported in 2023 that the world's five richest men doubled their wealth since 2020, while 60% of humanity became poorer.</p>
<p><span class='para-label'>E</span>Governments and organisations are grappling with how to regulate these new technologies. The European Union's AI Act, passed in 2024, represents the world's first comprehensive legal framework for artificial intelligence, categorising AI systems by risk level and imposing corresponding obligations on developers and deployers.</p>`,
      questions: [
        { num:1, type:"mc", question:"Who coined the term 'Fourth Industrial Revolution'?", options:["A. Elon Musk","B. Klaus Schwab","C. Bill Gates","D. Jeff Bezos"], answer:"B" },
        { num:2, type:"mc", question:"The Fourth Industrial Revolution is said to evolve at what pace?", options:["A. Linear","B. Cyclical","C. Exponential","D. Gradual"], answer:"C" },
        { num:3, type:"fill", question:"IoT stands for Internet of _______.", answer:"Things" },
        { num:4, type:"fill", question:"McKinsey estimates automation could displace up to _______ million workers by 2030.", answer:"800" },
        { num:5, type:"mc", question:"How many new roles does the WEF predict will be created?", options:["A. 47 million","B. 75 million","C. 97 million","D. 120 million"], answer:"C" },
        { num:6, type:"mc", question:"According to paragraph D, which organisation reported on wealth inequality?", options:["A. UN","B. IMF","C. Oxfam","D. WEF"], answer:"C" },
        { num:7, type:"fill", question:"The EU's AI Act was passed in _______.", answer:"2024" },
        { num:8, type:"mc", question:"The EU AI Act categorises systems by which criterion?", options:["A. Cost","B. Country of origin","C. Risk level","D. Company size"], answer:"C" },
        { num:9, type:"fill", question:"The Third Industrial Revolution is also called the _______ revolution.", answer:"digital" },
        { num:10, type:"mc", question:"Which of the following is NOT listed as a key technology?", options:["A. Nanotechnology","B. Blockchain","C. Quantum computing","D. Robotics"], answer:"B" },
        { num:11, type:"fill", question:"The world's five richest men _______ their wealth since 2020.", answer:"doubled" },
        { num:12, type:"mc", question:"Where do critics say technology tends to cluster?", options:["A. In universities","B. In developing nations","C. In wealthy countries","D. In Asia"], answer:"C" },
        { num:13, type:"fill", question:"Schwab founded the World _______ Forum.", answer:"Economic" }
      ]
    },
    { title: "Blockchain Technology: Beyond Cryptocurrency",
      text: `<p><span class='para-label'>A</span>When Bitcoin was introduced in 2009 by the pseudonymous Satoshi Nakamoto, it brought with it an underlying technology — blockchain — that many experts now believe has applications far beyond digital currency. A blockchain is essentially a distributed ledger: a record of transactions maintained simultaneously across thousands of computers, making it virtually impossible to alter historical entries without detection.</p>
<p><span class='para-label'>B</span>In supply chain management, blockchain is being used to track goods from origin to consumer. Walmart has implemented blockchain tracking for its leafy greens, reducing the time needed to trace the source of a contamination from seven days to 2.2 seconds. This has significant implications for food safety and recalls.</p>
<p><span class='para-label'>C</span>Healthcare represents another promising domain. Patient records stored on a blockchain could be securely shared between hospitals without a central authority, reducing duplicate testing and improving care coordination. Estonia has been particularly innovative, having moved 95% of its medical data onto a blockchain-based system by 2020.</p>
<p><span class='para-label'>D</span>Smart contracts — self-executing agreements written into blockchain code — are transforming legal and financial services. These contracts automatically execute when predefined conditions are met, eliminating the need for intermediaries such as banks or lawyers in routine transactions. The global smart contract market was valued at $684 million in 2022 and is projected to reach $1.5 billion by 2028.</p>
<p><span class='para-label'>E</span>Despite its potential, blockchain faces significant challenges. Energy consumption is a major concern — the Bitcoin network alone consumes approximately 127 terawatt-hours annually, comparable to the energy use of Norway. Scalability remains a technical hurdle, and regulatory uncertainty continues to hamper broader adoption in many jurisdictions.</p>`,
      questions: [
        { num:14, type:"fill", question:"Bitcoin was introduced in _______.", answer:"2009" },
        { num:15, type:"fill", question:"A blockchain is a type of distributed _______.", answer:"ledger" },
        { num:16, type:"mc", question:"Walmart uses blockchain for which food product?", options:["A. Meat products","B. Leafy greens","C. Dairy products","D. Grains"], answer:"B" },
        { num:17, type:"fill", question:"Walmart reduced contamination tracing time to _______ seconds.", answer:"2.2" },
        { num:18, type:"mc", question:"What percentage of Estonia's medical data is on blockchain?", options:["A. 75%","B. 85%","C. 90%","D. 95%"], answer:"D" },
        { num:19, type:"fill", question:"Self-executing agreements written into blockchain are called _______ contracts.", answer:"smart" },
        { num:20, type:"mc", question:"The smart contract market was valued at how much in 2022?", options:["A. $384 million","B. $684 million","C. $984 million","D. $1.2 billion"], answer:"B" },
        { num:21, type:"fill", question:"Bitcoin's energy use is comparable to the country of _______.", answer:"Norway" },
        { num:22, type:"mc", question:"Which challenge is described as a 'technical hurdle'?", options:["A. Security","B. Cost","C. Scalability","D. Adoption"], answer:"C" },
        { num:23, type:"fill", question:"The creator of Bitcoin used the pseudonym Satoshi _______.", answer:"Nakamoto" },
        { num:24, type:"mc", question:"Smart contracts eliminate the need for which of the following?", options:["A. Computers","B. Intermediaries","C. Regulations","D. Developers"], answer:"B" },
        { num:25, type:"fill", question:"The smart contract market is projected to reach $_______ billion by 2028.", answer:"1.5" },
        { num:26, type:"mc", question:"In which paragraph is healthcare discussed?", options:["A. Paragraph A","B. Paragraph B","C. Paragraph C","D. Paragraph D"], answer:"C" }
      ]
    },
    { title: "The Ethics of Autonomous Vehicles",
      text: `<p><span class='para-label'>A</span>Self-driving cars promise to revolutionise transportation, potentially reducing the approximately 1.35 million road deaths that occur globally each year. Since 94% of serious crashes are caused by human error, proponents argue that removing the human element should dramatically improve road safety. However, the path to full autonomy is paved with technical, legal, and ethical challenges that society has barely begun to address.</p>
<p><span class='para-label'>B</span>The trolley problem — a classic philosophical thought experiment — has taken on new relevance in the context of autonomous vehicles. If a self-driving car must choose between hitting a group of pedestrians or swerving and killing its own passenger, what decision should its algorithm make? Different cultures answer this question differently; a 2018 MIT study called the Moral Machine experiment surveyed 2.3 million people across 233 countries and found significant variation in moral preferences.</p>
<p><span class='para-label'>C</span>Liability is another unresolved issue. When a human driver causes an accident, the legal framework is clear. But when an autonomous vehicle is at fault, who bears responsibility — the car's owner, the manufacturer, or the software developer? Several countries are developing new legal frameworks to address this gap, but international consensus remains elusive.</p>
<p><span class='para-label'>D</span>Cybersecurity presents a particularly alarming concern. A vehicle that can be driven remotely could, in theory, be hacked. In 2015, security researchers demonstrated that a Jeep Cherokee could be remotely controlled over the internet, leading to a recall of 1.4 million vehicles. As autonomous vehicles become networked within smart city infrastructure, the attack surface expands dramatically.</p>
<p><span class='para-label'>E</span>Despite these obstacles, deployment is advancing. As of 2024, Waymo operates a commercial robotaxi service in San Francisco and Phoenix, having logged over 20 million miles of autonomous driving. Tesla's Full Self-Driving package, available by subscription, has been installed in over two million vehicles worldwide, though it still requires driver supervision.</p>`,
      questions: [
        { num:27, type:"fill", question:"Approximately _______ million road deaths occur globally each year.", answer:"1.35" },
        { num:28, type:"mc", question:"What percentage of serious crashes are caused by human error?", options:["A. 84%","B. 88%","C. 92%","D. 94%"], answer:"D" },
        { num:29, type:"fill", question:"The philosophical thought experiment mentioned is called the _______ problem.", answer:"trolley" },
        { num:30, type:"mc", question:"The MIT Moral Machine study surveyed people across how many countries?", options:["A. 133","B. 183","C. 233","D. 283"], answer:"C" },
        { num:31, type:"fill", question:"The Moral Machine experiment was published in _______.", answer:"2018" },
        { num:32, type:"mc", question:"When an autonomous vehicle causes an accident, the question of who is responsible is described as:", options:["A. Resolved","B. Unresolved","C. International","D. Irrelevant"], answer:"B" },
        { num:33, type:"fill", question:"In 2015, researchers demonstrated a _______ Cherokee could be remotely controlled.", answer:"Jeep" },
        { num:34, type:"mc", question:"How many vehicles were recalled following the 2015 hacking demonstration?", options:["A. 400,000","B. 800,000","C. 1.4 million","D. 2 million"], answer:"C" },
        { num:35, type:"fill", question:"Waymo operates robotaxi services in San Francisco and _______.", answer:"Phoenix" },
        { num:36, type:"mc", question:"How many miles of autonomous driving had Waymo logged as of 2024?", options:["A. 10 million","B. 15 million","C. 20 million","D. 25 million"], answer:"C" },
        { num:37, type:"fill", question:"Tesla's Full Self-Driving is available by _______.", answer:"subscription" },
        { num:38, type:"mc", question:"Tesla's FSD has been installed in how many vehicles worldwide?", options:["A. One million","B. Two million","C. Three million","D. Five million"], answer:"B" },
        { num:39, type:"mc", question:"The text says that as vehicles become networked, the _______ expands.", options:["A. road network","B. market share","C. attack surface","D. liability framework"], answer:"C" },
        { num:40, type:"fill", question:"The article states that 94% of crashes are caused by human _______.", answer:"error" }
      ]
    }
  ]},
  writing: {
    task1: { chart:"A bar chart comparing the average broadband speeds (Mbps) in six countries: South Korea (200), Singapore (180), Norway (160), Japan (140), UK (80), and Australia (60) in 2023.", prompt:"Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt:"Some people believe that technology is making us more isolated from one another. Others disagree. Discuss both views and give your own opinion." }
  },
  speaking: {
    part1: { questions:["Do you use a smartphone? How much time do you spend on it each day?","What apps do you find most useful in your daily life?","How has technology changed the way you communicate with friends and family?","Do you think children should be given smartphones? At what age?"] },
    part2: { topic:"Describe a piece of technology that has changed your life.", points:["What it is","When you started using it","How you use it","Why it has been important to you"], followUp:"How do you think this technology will develop in the future?" },
    part3: { questions:["Do you think artificial intelligence will eventually replace human workers in most industries?","How should governments regulate the development of new technologies?","Is it possible for technology to go too far? Give an example.","How do you think our relationship with technology will change in the next 20 years?"] }
  }
},

// ─────────────────────────────────────────────
// TEST 2 — Environment & Climate
// ─────────────────────────────────────────────
{
  id: 2, topic: "Environment & Climate",
  listening: { sections: [
    { description: "A conversation about planning a university ecology project",
      transcript: "Professor: Have you decided on your fieldwork location? Student: Yes, we're going to the Lake District in northern England. Professor: Good choice. When will you go? Student: The third week of April — we need to avoid the nesting season which starts in May. Professor: How many students in your group? Student: Eight, including myself. Professor: You'll need to complete a risk assessment form before departure. Hand it to me by April 5th. Student: Understood. We're focusing on water quality — specifically measuring pH levels and nitrate concentrations. Professor: Have you obtained permission to collect water samples? Student: Yes, from the National Park Authority. They gave us a permit valid for two weeks.",
      questions: [
        { num:1, type:"fill", question:"The fieldwork location is the _______ District.", answer:"Lake" },
        { num:2, type:"fill", question:"Fieldwork is planned for the third week of _______.", answer:"April" },
        { num:3, type:"mc", question:"Why must they avoid May?", options:["A. Flooding season","B. Nesting season","C. Exam period","D. Park closure"], answer:"B" },
        { num:4, type:"fill", question:"There are _______ students in the group.", answer:"eight" },
        { num:5, type:"fill", question:"The risk assessment form must be submitted by April _______.", answer:"5th" },
        { num:6, type:"mc", question:"What are the students measuring?", options:["A. Temperature and salinity","B. pH levels and nitrate concentrations","C. Oxygen levels and turbidity","D. Carbon dioxide and nitrogen"], answer:"B" },
        { num:7, type:"fill", question:"Permission was obtained from the National Park _______.", answer:"Authority" },
        { num:8, type:"mc", question:"How long is the permit valid?", options:["A. One week","B. Two weeks","C. One month","D. Two months"], answer:"B" },
        { num:9, type:"fill", question:"The fieldwork is in northern _______.", answer:"England" },
        { num:10, type:"mc", question:"What must students complete before departure?", options:["A. Insurance form","B. Budget proposal","C. Risk assessment form","D. Equipment checklist"], answer:"C" }
      ]
    },
    { description: "A documentary excerpt on coral reef decline",
      transcript: "Narrator: The Great Barrier Reef, stretching 2,300 kilometres along Australia's northeastern coast, is the world's largest coral reef system, home to over 1,500 species of fish and 4,000 types of mollusc. But since 1985, the reef has lost over 50% of its coral cover. The primary driver is ocean warming — when water temperatures rise by just 1 degree Celsius above the seasonal maximum, corals expel the symbiotic algae living in their tissues, causing bleaching. Since 1998, the reef has experienced five mass bleaching events, the most recent in 2022 affecting 91% of surveyed reefs. Ocean acidification — caused by seawater absorbing atmospheric carbon dioxide — also weakens coral skeletons, making recovery increasingly difficult.",
      questions: [
        { num:11, type:"fill", question:"The Great Barrier Reef stretches _______ kilometres.", answer:"2,300" },
        { num:12, type:"mc", question:"How many species of fish does the reef support?", options:["A. 500","B. 1,000","C. 1,500","D. 2,000"], answer:"C" },
        { num:13, type:"fill", question:"Since 1985, the reef has lost over _______% of its coral cover.", answer:"50" },
        { num:14, type:"fill", question:"Corals bleach when temperatures rise by just _______ degree(s) above maximum.", answer:"1" },
        { num:15, type:"mc", question:"How many mass bleaching events has the reef experienced since 1998?", options:["A. Three","B. Four","C. Five","D. Six"], answer:"C" },
        { num:16, type:"fill", question:"The most recent bleaching event occurred in _______.", answer:"2022" },
        { num:17, type:"fill", question:"_______% of surveyed reefs were affected in the 2022 bleaching.", answer:"91" },
        { num:18, type:"mc", question:"What causes ocean acidification?", options:["A. Thermal pollution","B. Oil spills","C. Seawater absorbing CO₂","D. Chemical runoff"], answer:"C" },
        { num:19, type:"fill", question:"The reef is home to 4,000 types of _______.", answer:"mollusc" },
        { num:20, type:"mc", question:"What do corals expel during bleaching?", options:["A. Water","B. Calcium","C. Symbiotic algae","D. Oxygen"], answer:"C" }
      ]
    },
    { description: "A lecture on renewable energy targets",
      transcript: "Lecturer: The Paris Agreement, signed in 2015, committed 196 countries to limiting global temperature rise to 1.5 degrees Celsius above pre-industrial levels. To achieve this, global carbon emissions must reach net zero by 2050. Currently, renewable energy sources — wind, solar, hydro, and geothermal — supply about 30% of global electricity. The International Energy Agency projects this must reach 90% by 2050. Solar power alone is expected to become the largest source of electricity globally by 2035. In 2023, global investment in clean energy exceeded fossil fuel investment for the first time, reaching $1.7 trillion. China leads in renewable capacity, having installed 340 gigawatts of new renewable capacity in 2023 alone.",
      questions: [
        { num:21, type:"fill", question:"The Paris Agreement was signed in _______.", answer:"2015" },
        { num:22, type:"fill", question:"_______ countries committed to the Paris Agreement.", answer:"196" },
        { num:23, type:"fill", question:"Global emissions must reach net zero by _______.", answer:"2050" },
        { num:24, type:"mc", question:"What percentage of global electricity currently comes from renewables?", options:["A. 20%","B. 25%","C. 30%","D. 35%"], answer:"C" },
        { num:25, type:"fill", question:"Renewable electricity must reach _______% by 2050 according to the IEA.", answer:"90" },
        { num:26, type:"mc", question:"By which year is solar expected to be the largest electricity source?", options:["A. 2030","B. 2035","C. 2040","D. 2045"], answer:"B" },
        { num:27, type:"fill", question:"In 2023, clean energy investment reached $_______ trillion.", answer:"1.7" },
        { num:28, type:"mc", question:"Which country leads in renewable capacity?", options:["A. USA","B. Germany","C. India","D. China"], answer:"D" },
        { num:29, type:"fill", question:"China installed _______ gigawatts of new renewable capacity in 2023.", answer:"340" },
        { num:30, type:"mc", question:"The temperature rise limit in the Paris Agreement is:", options:["A. 1.0°C","B. 1.5°C","C. 2.0°C","D. 2.5°C"], answer:"B" }
      ]
    },
    { description: "A panel discussion on plastic pollution in oceans",
      transcript: "Panellist 1: Current estimates suggest that 8 million metric tons of plastic enter the oceans every year. Panellist 2: The Great Pacific Garbage Patch is often cited — it covers approximately 1.6 million square kilometres, roughly twice the size of Texas. Panellist 1: Microplastics are now found in the deepest ocean trenches, including the Mariana Trench at 10,924 metres depth. Panellist 2: And in human blood — a 2022 study found microplastics in the blood of 77% of participants. Moderator: What solutions exist? Panellist 1: Extended Producer Responsibility schemes require manufacturers to fund recycling. The EU's Single-Use Plastics Directive has banned ten specific plastic items since 2021. Panellist 2: Beach clean-up initiatives removed 35,000 tonnes of waste last year through a global network of 120 countries.",
      questions: [
        { num:31, type:"fill", question:"_______ million metric tons of plastic enter oceans each year.", answer:"8" },
        { num:32, type:"fill", question:"The Great Pacific Garbage Patch covers approximately _______ million square kilometres.", answer:"1.6" },
        { num:33, type:"mc", question:"The Garbage Patch is roughly the size of:", options:["A. California","B. Texas","C. Alaska","D. France"], answer:"B" },
        { num:34, type:"fill", question:"Microplastics have been found in the Mariana Trench at _______ metres depth.", answer:"10,924" },
        { num:35, type:"mc", question:"What percentage of participants had microplastics in their blood?", options:["A. 57%","B. 67%","C. 77%","D. 87%"], answer:"C" },
        { num:36, type:"fill", question:"EPR stands for Extended Producer _______.", answer:"Responsibility" },
        { num:37, type:"mc", question:"When did the EU's Single-Use Plastics Directive come into effect?", options:["A. 2019","B. 2020","C. 2021","D. 2022"], answer:"C" },
        { num:38, type:"fill", question:"The Directive banned _______ specific plastic items.", answer:"ten" },
        { num:39, type:"fill", question:"Beach clean-ups removed _______ tonnes of waste last year.", answer:"35,000" },
        { num:40, type:"mc", question:"How many countries participate in the clean-up network?", options:["A. 80","B. 100","C. 120","D. 150"], answer:"C" }
      ]
    }
  ]},
  reading: { passages: [
    { title: "Rewilding: Restoring Nature's Balance",
      text: `<p><span class='para-label'>A</span>Rewilding is a progressive approach to conservation that aims to restore and protect natural processes and wilderness areas. Unlike traditional conservation, which often focuses on managing specific species or habitats, rewilding takes a hands-off approach, allowing ecosystems to repair themselves once key species and natural processes are reintroduced. The concept was popularised by conservation biologist Michael Soulé and writer Dave Foreman in the 1990s.</p>
<p><span class='para-label'>B</span>One of the most celebrated rewilding experiments took place in Yellowstone National Park, USA. Wolves were reintroduced in 1995, having been absent for 70 years. The effects cascaded through the ecosystem in what ecologists call a 'trophic cascade'. Elk populations, previously unchecked, began to be controlled. This allowed riverside vegetation — willows and aspens — to recover, which in turn stabilised riverbanks, changed river courses, and created habitat for beavers, songbirds, and fish. The wolves had, in effect, changed the rivers.</p>
<p><span class='para-label'>C</span>In Europe, rewilding projects are gaining momentum. In the Cairngorms in Scotland, native woodland is being restored by removing deer fencing and reintroducing locally extinct species such as white-tailed eagles and beavers. Beavers, reintroduced to the River Otter in Devon, England, in 2015, have created wetlands that reduce downstream flooding by up to 30%.</p>
<p><span class='para-label'>D</span>Critics of rewilding raise legitimate concerns. Farmers fear predator reintroductions — wolves and lynx — could threaten livestock. Communities living near rewilded areas worry about reduced agricultural land and potential conflicts with wildlife. In some regions, rewilding has been associated with land being purchased by wealthy investors, raising questions about rural livelihoods and 'green colonialism'.</p>
<p><span class='para-label'>E</span>Proponents counter that the economic benefits of rewilded landscapes — through ecotourism, reduced flood damage, carbon sequestration, and improved water quality — far outweigh the costs. A study by Rewilding Britain estimated that rewilding 30% of the UK's land could generate £101 billion in economic benefits over 30 years.</p>`,
      questions: [
        { num:1, type:"fill", question:"Rewilding was popularised by Michael Soulé and Dave _______.", answer:"Foreman" },
        { num:2, type:"mc", question:"When were wolves reintroduced to Yellowstone?", options:["A. 1985","B. 1990","C. 1995","D. 2000"], answer:"C" },
        { num:3, type:"fill", question:"Wolves had been absent from Yellowstone for _______ years.", answer:"70" },
        { num:4, type:"fill", question:"The ecological chain reaction is called a trophic _______.", answer:"cascade" },
        { num:5, type:"mc", question:"Which riverside trees recovered after wolves returned?", options:["A. Oaks and elms","B. Willows and aspens","C. Pines and firs","D. Birches and beeches"], answer:"B" },
        { num:6, type:"fill", question:"Beavers were reintroduced to the River Otter in Devon in _______.", answer:"2015" },
        { num:7, type:"fill", question:"Beaver-created wetlands reduce downstream flooding by up to _______%.", answer:"30" },
        { num:8, type:"mc", question:"What do farmers fear about rewilding?", options:["A. Land devaluation","B. Water shortage","C. Predator threats to livestock","D. Tourism overcrowding"], answer:"C" },
        { num:9, type:"fill", question:"Critics associate rewilding with land purchases by wealthy _______.", answer:"investors" },
        { num:10, type:"mc", question:"What economic benefit is NOT mentioned in paragraph E?", options:["A. Ecotourism","B. Carbon sequestration","C. Reduced flood damage","D. Renewable energy"], answer:"D" },
        { num:11, type:"fill", question:"Rewilding Britain estimated _______ billion pounds in economic benefits over 30 years.", answer:"101" },
        { num:12, type:"mc", question:"The word 'trophic' in paragraph B most likely relates to:", options:["A. Weather patterns","B. Feeding relationships","C. Water cycles","D. Soil composition"], answer:"B" },
        { num:13, type:"fill", question:"The Cairngorms rewilding project is located in _______.", answer:"Scotland" }
      ]
    },
    { title: "Urban Heat Islands and Green Infrastructure",
      text: `<p><span class='para-label'>A</span>An urban heat island (UHI) is a metropolitan area that is significantly warmer than its surrounding rural areas due to human activities. The phenomenon was first documented by meteorologist Luke Howard in early 19th-century London. Today, cities can be up to 10 degrees Celsius warmer than nearby countryside, primarily because of the replacement of natural vegetation with heat-absorbing surfaces such as asphalt and concrete, reduced tree cover, waste heat from buildings and vehicles, and the canyon-like geometry of streets that trap heat.</p>
<p><span class='para-label'>B</span>The public health consequences are severe. Heat waves amplified by UHI effects were responsible for over 70,000 deaths across Europe during the summer of 2003. In 2022, an estimated 61,000 Europeans died from heat-related causes — a figure projected to increase significantly under climate change scenarios. Low-income urban residents, elderly people, and outdoor workers are disproportionately affected.</p>
<p><span class='para-label'>C</span>Green infrastructure offers a powerful mitigation strategy. Urban trees provide shade and release water vapour through transpiration, cooling the surrounding air. A single mature tree can provide cooling equivalent to ten room-sized air conditioning units operating 20 hours a day. Singapore has become a global model, mandating that all new developments replace the greenery they displace by incorporating rooftop gardens and vertical green walls.</p>
<p><span class='para-label'>D</span>Cool roofs — surfaces painted white or covered with reflective materials — can reduce rooftop temperatures by up to 50°C and lower internal building temperatures by 2–3°C. Los Angeles initiated a cool pavement programme, painting streets with reflective grey coating, which reduced surface temperatures by 10–12°C during trials.</p>
<p><span class='para-label'>E</span>Water features also play a role. Restoring urban waterways and creating lakes and fountains can reduce surrounding air temperatures by 2–4°C. Melbourne's ambitious urban cooling strategy aims to double its urban tree canopy from 22% to 40% by 2040, reduce surface temperatures by 4°C, and create 10 new urban parks by 2030.</p>`,
      questions: [
        { num:14, type:"fill", question:"The UHI effect was first documented by meteorologist Luke _______.", answer:"Howard" },
        { num:15, type:"mc", question:"How much warmer can cities be compared to surrounding countryside?", options:["A. Up to 5°C","B. Up to 7°C","C. Up to 10°C","D. Up to 15°C"], answer:"C" },
        { num:16, type:"fill", question:"Over _______ deaths occurred across Europe during the 2003 heat wave.", answer:"70,000" },
        { num:17, type:"mc", question:"Which group is NOT listed as disproportionately affected?", options:["A. Elderly people","B. Low-income residents","C. Outdoor workers","D. Children"], answer:"D" },
        { num:18, type:"fill", question:"A single mature tree equals the cooling of _______ room-sized air conditioners.", answer:"ten" },
        { num:19, type:"mc", question:"Which city is described as a global model for green infrastructure?", options:["A. Tokyo","B. Singapore","C. Amsterdam","D. Melbourne"], answer:"B" },
        { num:20, type:"fill", question:"Cool roofs can reduce rooftop temperatures by up to _______°C.", answer:"50" },
        { num:21, type:"mc", question:"What did Los Angeles use in its cool pavement programme?", options:["A. White paint","B. Green coating","C. Reflective grey coating","D. Dark asphalt"], answer:"C" },
        { num:22, type:"fill", question:"LA's programme reduced surface temperatures by _______–_______°C.", answer:"10–12" },
        { num:23, type:"mc", question:"Melbourne aims to double its urban tree canopy to what percentage?", options:["A. 30%","B. 35%","C. 40%","D. 45%"], answer:"C" },
        { num:24, type:"fill", question:"Melbourne's strategy aims to reduce surface temperatures by _______°C.", answer:"4" },
        { num:25, type:"mc", question:"By when does Melbourne plan to create 10 new urban parks?", options:["A. 2025","B. 2028","C. 2030","D. 2035"], answer:"C" },
        { num:26, type:"fill", question:"Melbourne's current tree canopy coverage is _______% of the city.", answer:"22" }
      ]
    },
    { title: "The Economics of Carbon Pricing",
      text: `<p><span class='para-label'>A</span>Carbon pricing is an instrument that captures the external costs of greenhouse gas emissions — the costs of climate change that are not reflected in the price of fossil fuels. By putting a price on carbon, governments aim to redirect investment away from fossil fuels toward cleaner alternatives. There are two main mechanisms: carbon taxes and emissions trading systems (ETS), also known as cap-and-trade.</p>
<p><span class='para-label'>B</span>A carbon tax sets a direct price on emissions, giving businesses certainty about costs. British Columbia's carbon tax, introduced in 2008, is one of the world's longest-running examples. Studies show it has reduced fuel consumption in the province by 15% compared to the rest of Canada, without significantly harming economic growth.</p>
<p><span class='para-label'>C</span>Emissions trading systems, by contrast, set a cap on total emissions and allow companies to buy and sell allowances within that cap. The EU ETS, launched in 2005, covers about 40% of the EU's emissions across sectors including power generation, manufacturing, and aviation. Carbon prices under the EU ETS reached a record €100 per tonne in 2023, making clean technology investments increasingly viable.</p>
<p><span class='para-label'>D</span>Critics argue that existing carbon prices are still too low to drive the necessary emissions reductions. The IMF estimates that a global carbon price of at least $75 per tonne by 2030 is needed to meet climate targets. As of 2024, only 4% of global emissions are covered by carbon prices at or above this level.</p>
<p><span class='para-label'>E</span>Revenue from carbon pricing can be used in various ways: funding clean energy research, compensating low-income households, or reducing other taxes. Canada distributes carbon pricing revenue directly to households as a 'carbon rebate', with eight out of ten families receiving more in rebates than they pay in carbon taxes — a model that has maintained public support for the policy.</p>`,
      questions: [
        { num:27, type:"fill", question:"The two main carbon pricing mechanisms are carbon taxes and _______.", answer:"emissions trading systems" },
        { num:28, type:"mc", question:"When was British Columbia's carbon tax introduced?", options:["A. 2004","B. 2006","C. 2008","D. 2010"], answer:"C" },
        { num:29, type:"fill", question:"BC's carbon tax reduced fuel consumption by _______% vs. rest of Canada.", answer:"15" },
        { num:30, type:"mc", question:"When was the EU ETS launched?", options:["A. 2000","B. 2003","C. 2005","D. 2007"], answer:"C" },
        { num:31, type:"fill", question:"The EU ETS covers about _______% of the EU's emissions.", answer:"40" },
        { num:32, type:"fill", question:"EU ETS carbon prices reached a record €_______ per tonne in 2023.", answer:"100" },
        { num:33, type:"mc", question:"What global carbon price does the IMF say is needed by 2030?", options:["A. $50 per tonne","B. $75 per tonne","C. $100 per tonne","D. $125 per tonne"], answer:"B" },
        { num:34, type:"fill", question:"As of 2024, only _______% of global emissions are covered at the needed price level.", answer:"4" },
        { num:35, type:"mc", question:"What is Canada's carbon revenue distribution mechanism called?", options:["A. Green dividend","B. Climate credit","C. Carbon rebate","D. Eco payment"], answer:"C" },
        { num:36, type:"mc", question:"What fraction of Canadian families receive more in rebates than they pay?", options:["A. Six out of ten","B. Seven out of ten","C. Eight out of ten","D. Nine out of ten"], answer:"C" },
        { num:37, type:"fill", question:"ETS is also known as _______-and-trade.", answer:"cap" },
        { num:38, type:"mc", question:"Which sector is NOT mentioned as covered by the EU ETS?", options:["A. Power generation","B. Manufacturing","C. Agriculture","D. Aviation"], answer:"C" },
        { num:39, type:"fill", question:"Carbon pricing captures _______ costs of emissions.", answer:"external" },
        { num:40, type:"fill", question:"The EU ETS covers about 40% of EU emissions across _______ sectors including power and aviation.", answer:"three" }
      ]
    }
  ]},
  writing: {
    task1: { chart:"A line graph showing average global temperatures from 1880 to 2023, with a clear upward trend, especially accelerating after 1980. The 2023 average was 1.45°C above the pre-industrial baseline.", prompt:"Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt:"Governments should make it compulsory for all citizens to switch to electric vehicles by 2035. To what extent do you agree or disagree?" }
  },
  speaking: {
    part1: { questions:["Do you try to live in an environmentally friendly way? Give examples.","How do people in your country feel about environmental issues?","Have you ever taken part in any environmental activities such as recycling or clean-ups?","Do you think individuals or governments bear more responsibility for protecting the environment?"] },
    part2: { topic:"Describe a natural place you have visited that impressed you.", points:["Where it is","When you went there","What you saw or experienced","Why it made an impression on you"], followUp:"How important is it to preserve such natural places for future generations?" },
    part3: { questions:["Do you think climate change is the most serious problem facing the world today?","Should wealthy countries do more to help developing nations tackle environmental challenges?","How effective are international agreements like the Paris Agreement?","What lifestyle changes do you think people are most reluctant to make for environmental reasons?"] }
  }
},

// ─────────────────────────────────────────────
// TEST 3 — Education Systems
// ─────────────────────────────────────────────
{
  id: 3, topic: "Education Systems",
  listening: { sections: [
    { description: "Two students discussing university course options",
      transcript: "Maria: I'm trying to decide between Computer Science and Data Science for my degree. Tom: What's the difference in terms of subjects? Maria: Computer Science covers algorithms, software engineering, and computer architecture. Data Science focuses more on statistics, machine learning, and data visualisation. Tom: What about career prospects? Maria: Data Science graduates earn an average starting salary of £38,000 in the UK, while Computer Science is slightly higher at £41,000. Tom: But Data Science is growing faster — I read that demand for data scientists will increase by 36% by 2030. Maria: True. The application deadline for both programmes is January 15th. I need to submit a personal statement and two academic references.",
      questions: [
        { num:1, type:"mc", question:"What is Maria deciding between?", options:["A. Law and Economics","B. Computer Science and Data Science","C. Engineering and Physics","D. Mathematics and Statistics"], answer:"B" },
        { num:2, type:"fill", question:"Data Science starting salary in the UK averages £_______.", answer:"38,000" },
        { num:3, type:"fill", question:"Computer Science starting salary is £_______.", answer:"41,000" },
        { num:4, type:"fill", question:"Demand for data scientists will increase by _______% by 2030.", answer:"36" },
        { num:5, type:"fill", question:"The application deadline is January _______.", answer:"15th" },
        { num:6, type:"mc", question:"How many academic references are needed?", options:["A. One","B. Two","C. Three","D. Four"], answer:"B" },
        { num:7, type:"fill", question:"Computer Science covers algorithms and software _______.", answer:"engineering" },
        { num:8, type:"mc", question:"Which subject focuses on data visualisation?", options:["A. Computer Science","B. Data Science","C. Both","D. Neither"], answer:"B" },
        { num:9, type:"fill", question:"Students must submit a personal _______.", answer:"statement" },
        { num:10, type:"mc", question:"Which degree has higher average starting salary?", options:["A. Data Science","B. Computer Science","C. Both the same","D. Not stated"], answer:"B" }
      ]
    },
    { description: "A talk about the Finnish education system",
      transcript: "Speaker: Finland consistently ranks among the top nations in the PISA — Programme for International Student Assessment — rankings. What makes Finnish education distinctive? First, formal schooling does not begin until age 7, compared to age 5 in the UK and 6 in most of Europe. Children spend more time in play-based learning in early years. Second, teachers in Finland are highly respected and well-paid. All teachers must hold a master's degree — the teaching profession is as competitive to enter as medicine or law. Third, there are no standardised national tests until the age of 16. Finnish schools emphasise collaboration over competition. Fourth, homework is minimal — Finnish students spend on average 30 minutes per day on homework, among the lowest in the OECD. Despite this, Finland outperforms many countries that assign far more homework.",
      questions: [
        { num:11, type:"fill", question:"PISA stands for Programme for International Student _______.", answer:"Assessment" },
        { num:12, type:"fill", question:"Formal schooling in Finland starts at age _______.", answer:"7" },
        { num:13, type:"mc", question:"At what age do UK children start school?", options:["A. 5","B. 6","C. 7","D. 8"], answer:"A" },
        { num:14, type:"fill", question:"Finnish teachers must hold a _______ degree.", answer:"master's" },
        { num:15, type:"mc", question:"Teaching in Finland is compared to which professions?", options:["A. Engineering and science","B. Medicine and law","C. Finance and business","D. Art and music"], answer:"B" },
        { num:16, type:"fill", question:"No standardised tests are held until age _______.", answer:"16" },
        { num:17, type:"mc", question:"How much time do Finnish students spend on homework daily?", options:["A. 15 minutes","B. 30 minutes","C. 45 minutes","D. 60 minutes"], answer:"B" },
        { num:18, type:"fill", question:"Finnish schools emphasise _______ over competition.", answer:"collaboration" },
        { num:19, type:"mc", question:"Which organisation is mentioned regarding homework averages?", options:["A. UNESCO","B. WHO","C. OECD","D. IMF"], answer:"C" },
        { num:20, type:"fill", question:"Early years education in Finland emphasises play-based _______.", answer:"learning" }
      ]
    },
    { description: "A lecture on the rise of online learning",
      transcript: "Professor: The COVID-19 pandemic forced an unprecedented experiment in online education. Between March and May 2020, approximately 1.6 billion learners — 94% of the world's student population — were affected by school closures. Zoom reported 300 million daily meeting participants at the peak. However, the shift exposed a profound digital divide: UNESCO estimated that two-thirds of the world's students lacked access to the internet at home. In response, Coursera saw enrolments increase by 640% during 2020. MOOCs — Massive Open Online Courses — became mainstream. Despite initial enthusiasm, research showed that completion rates for free online courses remain very low, averaging just 3 to 6 percent. Hybrid models, combining face-to-face and online learning, are now considered optimal by most education researchers.",
      questions: [
        { num:21, type:"fill", question:"Approximately _______ billion learners were affected by school closures.", answer:"1.6" },
        { num:22, type:"fill", question:"This represented _______% of the world's student population.", answer:"94" },
        { num:23, type:"fill", question:"Zoom reached _______ million daily meeting participants at peak.", answer:"300" },
        { num:24, type:"mc", question:"What fraction of students lacked home internet, per UNESCO?", options:["A. One third","B. Half","C. Two thirds","D. Three quarters"], answer:"C" },
        { num:25, type:"fill", question:"Coursera enrolments increased by _______% during 2020.", answer:"640" },
        { num:26, type:"fill", question:"MOOC stands for Massive Open Online _______.", answer:"Courses" },
        { num:27, type:"mc", question:"What is the average completion rate for free online courses?", options:["A. 3–6%","B. 10–15%","C. 20–25%","D. 30–35%"], answer:"A" },
        { num:28, type:"fill", question:"_______ models combining face-to-face and online are considered optimal.", answer:"Hybrid" },
        { num:29, type:"mc", question:"When did the mass school closures begin?", options:["A. January 2020","B. February 2020","C. March 2020","D. April 2020"], answer:"C" },
        { num:30, type:"fill", question:"The situation is described as a _______ experiment in online education.", answer:"unprecedented" }
      ]
    },
    { description: "A seminar discussion on university tuition fees",
      transcript: "Professor Chen: Today we're examining the debate over tuition fees. In England, annual fees were raised to £9,000 in 2012, and now stand at £9,250. This led to predictions of a decline in applications, but university attendance actually increased — from 43% of school leavers in 2012 to 52% in 2022. The key factor is that UK students pay fees through an income-contingent loan — repayments only begin when earning above £27,295 per year, and outstanding debt is written off after 40 years. In contrast, the USA has average student debt of $37,574 per borrower. Germany abolished tuition fees entirely in 2014; Australia operates a similar deferred payment system to the UK. Norway and Sweden offer free higher education, funded through higher taxes.",
      questions: [
        { num:31, type:"fill", question:"English tuition fees were raised to £9,000 in _______.", answer:"2012" },
        { num:32, type:"fill", question:"Current English tuition fees stand at £_______.", answer:"9,250" },
        { num:33, type:"mc", question:"What percentage of school leavers attended university in 2022?", options:["A. 43%","B. 47%","C. 52%","D. 58%"], answer:"C" },
        { num:34, type:"fill", question:"UK loan repayments begin when earnings exceed £_______.", answer:"27,295" },
        { num:35, type:"fill", question:"UK student debt is written off after _______ years.", answer:"40" },
        { num:36, type:"mc", question:"What is the average US student debt per borrower?", options:["A. $27,574","B. $32,574","C. $37,574","D. $42,574"], answer:"C" },
        { num:37, type:"fill", question:"Germany abolished tuition fees in _______.", answer:"2014" },
        { num:38, type:"mc", question:"Which two countries offer free higher education?", options:["A. France and Spain","B. Norway and Sweden","C. Denmark and Finland","D. Switzerland and Austria"], answer:"B" },
        { num:39, type:"fill", question:"Norway and Sweden fund free education through higher _______.", answer:"taxes" },
        { num:40, type:"mc", question:"Australia's system is described as similar to:", options:["A. Germany's","B. The USA's","C. The UK's","D. Norway's"], answer:"C" }
      ]
    }
  ]},
  reading: { passages: [
    { title: "The Science of Learning: How Memory Works",
      text: `<p><span class='para-label'>A</span>Memory is not a single, unified system but a collection of distinct processes. The three-stage model proposed by Atkinson and Shiffrin in 1968 distinguishes between sensory memory (which holds perceptions for fractions of a second), short-term memory (which can hold approximately seven items for 20–30 seconds), and long-term memory (which has theoretically unlimited capacity and duration). Information moves between stages through attention and rehearsal.</p>
<p><span class='para-label'>B</span>Long-term memory is itself divided into explicit memory — things we consciously recall, such as facts and personal experiences — and implicit memory — skills and conditioned responses we perform automatically. Explicit memory further divides into semantic memory (general knowledge) and episodic memory (personal experiences tied to specific times and places).</p>
<p><span class='para-label'>C</span>Neuroscience has revolutionised our understanding of memory formation. The hippocampus, a seahorse-shaped structure deep in the temporal lobe, plays a critical role in converting short-term memories into long-term ones — a process called consolidation. The famous case of patient H.M., who had his hippocampi surgically removed in 1953 to treat epilepsy, demonstrated that without the hippocampus, new long-term memories cannot be formed.</p>
<p><span class='para-label'>D</span>Research on learning strategies reveals that some common study techniques are far less effective than believed. Passive re-reading produces minimal retention. By contrast, retrieval practice — testing yourself — dramatically improves memory. Psychologists call this the 'testing effect'. Spaced repetition, reviewing material at increasing intervals, is also highly effective. Apps such as Anki leverage these principles to optimise flashcard review schedules.</p>
<p><span class='para-label'>E</span>Sleep is essential for memory consolidation. During slow-wave sleep, the hippocampus replays the day's experiences and transfers them to the neocortex for long-term storage. Studies show that students who sleep for eight hours after learning retain 40% more information than those who sleep for six hours. The practice of 'cramming' before exams exploits short-term memory but produces poor long-term retention.</p>`,
      questions: [
        { num:1, type:"fill", question:"The three-stage memory model was proposed by Atkinson and Shiffrin in _______.", answer:"1968" },
        { num:2, type:"fill", question:"Short-term memory holds approximately _______ items.", answer:"seven" },
        { num:3, type:"mc", question:"Which type of memory holds perceptions for fractions of a second?", options:["A. Short-term memory","B. Long-term memory","C. Sensory memory","D. Working memory"], answer:"C" },
        { num:4, type:"fill", question:"Memory of personal experiences tied to time and place is called _______ memory.", answer:"episodic" },
        { num:5, type:"mc", question:"The hippocampus is located in which brain area?", options:["A. Frontal lobe","B. Parietal lobe","C. Occipital lobe","D. Temporal lobe"], answer:"D" },
        { num:6, type:"fill", question:"The process of converting short-term to long-term memory is called _______.", answer:"consolidation" },
        { num:7, type:"fill", question:"Patient H.M. had his hippocampi removed in _______.", answer:"1953" },
        { num:8, type:"mc", question:"What was patient H.M.'s original condition?", options:["A. Dementia","B. Epilepsy","C. Schizophrenia","D. Depression"], answer:"B" },
        { num:9, type:"fill", question:"Testing yourself is known as _______ practice.", answer:"retrieval" },
        { num:10, type:"fill", question:"Reviewing material at increasing intervals is called _______ repetition.", answer:"spaced" },
        { num:11, type:"mc", question:"Which app is mentioned as leveraging spaced repetition?", options:["A. Duolingo","B. Quizlet","C. Anki","D. Khan Academy"], answer:"C" },
        { num:12, type:"mc", question:"Students who sleep 8 hours retain how much more than those sleeping 6 hours?", options:["A. 20%","B. 30%","C. 40%","D. 50%"], answer:"C" },
        { num:13, type:"fill", question:"During sleep, the hippocampus transfers memories to the _______ for long-term storage.", answer:"neocortex" }
      ]
    },
    { title: "The Global Literacy Crisis",
      text: `<p><span class='para-label'>A</span>Despite remarkable progress over the past century, illiteracy remains a global challenge. UNESCO defines literacy as the ability to identify, understand, interpret, create, communicate, and compute using printed and written materials. By this definition, approximately 763 million adults worldwide — nearly 10% of the global adult population — remain illiterate, with two-thirds of them women.</p>
<p><span class='para-label'>B</span>The geography of illiteracy is starkly uneven. Sub-Saharan Africa has the highest illiteracy rates, with some countries recording fewer than 40% of adults as literate. South Asia, particularly Pakistan and Bangladesh, also faces significant challenges. By contrast, in OECD countries, functional illiteracy — the inability to use reading and writing skills effectively in daily life, even among those technically counted as literate — affects roughly 16% of adults.</p>
<p><span class='para-label'>C</span>The causes of illiteracy are complex and interconnected. Poverty is the primary driver: families in economic hardship often cannot afford school costs or must rely on children's labour. Gender inequality perpetuates the cycle, particularly in regions where girls' education is deprioritised. Armed conflict destroys schools and displaces populations. The UN estimates that 35% of out-of-school children worldwide live in conflict-affected areas.</p>
<p><span class='para-label'>D</span>Digital technology offers new approaches. Mobile-based literacy programmes have shown promising results in sub-Saharan Africa, where mobile phone penetration now exceeds 50%. The 'Pratham' model in India — which uses community volunteers and simple teaching materials — has been highly effective at scale, improving reading levels in over 300,000 villages.</p>
<p><span class='para-label'>E</span>The economic case for literacy investment is compelling. The World Bank estimates that each additional year of quality schooling increases an individual's earnings by 8–10%. Nations with higher literacy rates show stronger economic growth, lower infant mortality, better public health outcomes, and more stable governance. Literacy is thus not merely an educational goal but a foundation for human development in its broadest sense.</p>`,
      questions: [
        { num:14, type:"fill", question:"Approximately _______ million adults worldwide are illiterate.", answer:"763" },
        { num:15, type:"mc", question:"What fraction of illiterate adults are women?", options:["A. One third","B. Half","C. Two thirds","D. Three quarters"], answer:"C" },
        { num:16, type:"fill", question:"Sub-Saharan Africa records fewer than _______% of adults as literate in some countries.", answer:"40" },
        { num:17, type:"fill", question:"Functional illiteracy in OECD countries affects roughly _______% of adults.", answer:"16" },
        { num:18, type:"mc", question:"What is described as the primary driver of illiteracy?", options:["A. War","B. Gender inequality","C. Poverty","D. Lack of teachers"], answer:"C" },
        { num:19, type:"fill", question:"_______% of out-of-school children live in conflict-affected areas.", answer:"35" },
        { num:20, type:"mc", question:"Mobile phone penetration in sub-Saharan Africa now exceeds:", options:["A. 30%","B. 40%","C. 50%","D. 60%"], answer:"C" },
        { num:21, type:"fill", question:"The 'Pratham' model operates in _______.", answer:"India" },
        { num:22, type:"mc", question:"The Pratham model has improved reading levels in how many villages?", options:["A. 100,000","B. 200,000","C. 300,000","D. 400,000"], answer:"C" },
        { num:23, type:"fill", question:"Each additional year of schooling increases earnings by _______–10%.", answer:"8" },
        { num:24, type:"mc", question:"Which outcome is NOT mentioned as linked to higher literacy rates?", options:["A. Economic growth","B. Lower infant mortality","C. Better public health","D. Lower crime rates"], answer:"D" },
        { num:25, type:"fill", question:"Illiterate adults represent nearly _______% of the global adult population.", answer:"10" },
        { num:26, type:"fill", question:"The World Bank estimates earnings increase by 8–10% for each additional year of quality _______.", answer:"schooling" }
      ]
    },
    { title: "Montessori Education: Philosophy and Evidence",
      text: `<p><span class='para-label'>A</span>The Montessori method was developed by Italian physician and educator Maria Montessori, who opened her first classroom — the Casa dei Bambini — in Rome in 1907. Working initially with disadvantaged children, she developed a child-centred approach based on her observation that children have an innate desire to learn and can direct their own education when provided with appropriate materials and a prepared environment.</p>
<p><span class='para-label'>B</span>Key principles include mixed-age classrooms (typically spanning three years), freedom of movement, uninterrupted work periods of up to three hours, and specialised learning materials that are self-correcting — meaning children can identify their own errors without teacher intervention. Montessori teachers serve as 'guides' rather than instructors, observing rather than directing.</p>
<p><span class='para-label'>C</span>Today, there are estimated to be over 20,000 Montessori schools in 110 countries. In the United States alone, about 500 public schools operate Montessori programmes. The method has attracted famous alumni including Amazon's Jeff Bezos, Google founders Larry Page and Sergey Brin, and Wikipedia founder Jimmy Wales — all of whom have cited Montessori education as influential in developing their independent, creative thinking.</p>
<p><span class='para-label'>D</span>Research on Montessori outcomes is promising. A landmark 2006 study by Angeline Lillard and Nicole Else-Quest, published in the journal Science, compared children from a Milwaukee Montessori school with peers in traditional schools at ages 5 and 12. Montessori children showed significantly better academic performance in reading and maths, as well as stronger social skills and executive function.</p>
<p><span class='para-label'>E</span>Critics note that the evidence base is limited by the difficulty of conducting randomised controlled trials in education. Montessori schools also vary widely in their fidelity to the original method. Cost is another barrier — private Montessori education can be expensive, raising concerns about equity. However, the growing number of public Montessori programmes aims to address this accessibility challenge.</p>`,
      questions: [
        { num:27, type:"fill", question:"Maria Montessori opened her first classroom in _______.", answer:"1907" },
        { num:28, type:"fill", question:"The first Montessori classroom was in _______.", answer:"Rome" },
        { num:29, type:"fill", question:"The first classroom was called Casa dei _______.", answer:"Bambini" },
        { num:30, type:"mc", question:"How long are uninterrupted work periods in Montessori?", options:["A. One hour","B. Two hours","C. Three hours","D. Four hours"], answer:"C" },
        { num:31, type:"fill", question:"Montessori materials are described as self-_______.", answer:"correcting" },
        { num:32, type:"mc", question:"Approximately how many Montessori schools exist worldwide?", options:["A. 10,000","B. 15,000","C. 20,000","D. 25,000"], answer:"C" },
        { num:33, type:"fill", question:"Montessori schools operate in _______ countries.", answer:"110" },
        { num:34, type:"mc", question:"Which famous person is NOT mentioned as a Montessori alumnus?", options:["A. Jeff Bezos","B. Larry Page","C. Elon Musk","D. Jimmy Wales"], answer:"C" },
        { num:35, type:"fill", question:"The 2006 study was published in the journal _______.", answer:"Science" },
        { num:36, type:"fill", question:"The Lillard study compared children at ages 5 and _______.", answer:"12" },
        { num:37, type:"mc", question:"Montessori children showed better performance in which subjects?", options:["A. Science and history","B. Reading and maths","C. Art and music","D. Languages and PE"], answer:"B" },
        { num:38, type:"mc", question:"What is described as a barrier to Montessori education?", options:["A. Lack of schools","B. Teacher shortage","C. Cost","D. Government restrictions"], answer:"C" },
        { num:39, type:"fill", question:"Maria Montessori was a physician and _______.", answer:"educator" },
        { num:40, type:"mc", question:"Montessori classrooms typically span how many age groups?", options:["A. Two years","B. Three years","C. Four years","D. Five years"], answer:"B" }
      ]
    }
  ]},
  writing: {
    task1: { chart:"A table comparing education spending as a percentage of GDP in five countries: Norway (6.4%), UK (5.5%), USA (5.0%), China (3.6%), and India (2.9%) in 2022.", prompt:"Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt:"University education should be free for all students. To what extent do you agree or disagree?" }
  },
  speaking: {
    part1: { questions:["Did you enjoy school when you were young? Why or why not?","What subject did you find most difficult at school?","Do you think the education system in your country is effective?","How important is it to continue learning throughout your life?"] },
    part2: { topic:"Describe a teacher who had a significant impact on your life.", points:["Who the teacher was","What subject they taught","What made them special","How they influenced you"], followUp:"Do you think the qualities of a good teacher have changed in modern times?" },
    part3: { questions:["Should education systems focus more on academic subjects or practical skills?","How might artificial intelligence change the role of teachers in the future?","Do you think private schools should be abolished?","Is the pressure placed on students in modern education systems too high?"] }
  }
},

// ─────────────────────────────────────────────
// TESTS 4–25: Full production content
// ─────────────────────────────────────────────

...(() => {

  const condensedTopics = [
    {id:4,  topic:"Health & Medicine"},
    {id:5,  topic:"Urban Development"},
    {id:6,  topic:"Transportation"},
    {id:7,  topic:"Economics & Trade"},
    {id:8,  topic:"Art & Culture"},
    {id:9,  topic:"Science & Research"},
    {id:10, topic:"Society & Demographics"},
    {id:11, topic:"Food & Nutrition"},
    {id:12, topic:"Energy & Environment"},
    {id:13, topic:"Media & Communication"},
    {id:14, topic:"Sports & Fitness"},
    {id:15, topic:"Wildlife & Conservation"},
    {id:16, topic:"Architecture & Design"},
    {id:17, topic:"Psychology & Mental Health"},
    {id:18, topic:"History & Heritage"},
    {id:19, topic:"Globalisation"},
    {id:20, topic:"Space & Astronomy"},
    {id:21, topic:"Language & Linguistics"},
    {id:22, topic:"Tourism & Travel"},
    {id:23, topic:"Work & Employment"},
    {id:24, topic:"Ethics & Philosophy"},
    {id:25, topic:"Music & Digital Culture"}
  ];

  const listeningThemes = [
    ["a patient consultation","a health documentary","a lecture on nutrition","a seminar on mental health"],
    ["a town planning meeting","a news report on housing","a lecture on smart cities","a debate on urbanisation"],
    ["a travel agency call","a transport documentary","a lecture on public transit","a discussion on aviation"],
    ["a business meeting","an economics broadcast","a lecture on trade","a seminar on inflation"],
    ["an art gallery tour","a culture podcast","a lecture on world heritage","a discussion on art funding"],
    ["a lab briefing","a science documentary","a lecture on genetics","a seminar on climate science"],
    ["a census briefing","a sociology lecture","a talk on ageing populations","a seminar on migration"],
    ["a cooking show discussion","a nutrition lecture","a food industry report","a seminar on food security"],
    ["an energy company briefing","a power sector documentary","a lecture on renewables","a seminar on nuclear energy"],
    ["a media company meeting","a journalism lecture","a seminar on social media","a discussion on fake news"],
    ["a sports club meeting","a fitness lecture","an Olympic seminar","a discussion on esports"],
    ["a wildlife charity call","a conservation documentary","a lecture on biodiversity","a seminar on rewilding"],
    ["an architect consultation","a design documentary","a lecture on urban architecture","a seminar on sustainable design"],
    ["a counselling session","a psychology documentary","a lecture on cognitive bias","a seminar on behavioural economics"],
    ["an archaeological excavation briefing","a history documentary","a lecture on ancient civilisations","a seminar on heritage"],
    ["an international business call","a globalisation documentary","a lecture on trade blocs","a seminar on cultural exchange"],
    ["a space agency briefing","an astronomy documentary","a lecture on the solar system","a seminar on space exploration"],
    ["a language school meeting","a linguistics documentary","a lecture on language evolution","a seminar on multilingualism"],
    ["a travel agency meeting","a tourism documentary","a lecture on sustainable tourism","a seminar on cultural tourism"],
    ["an HR briefing","a labour economics lecture","a seminar on automation","a discussion on work-life balance"],
    ["an ethics committee meeting","a philosophy documentary","a lecture on moral philosophy","a seminar on AI ethics"],
    ["a music industry meeting","a culture documentary","a lecture on music history","a seminar on streaming"]
  ];

  const writingTopics = [
    { task1:"A pie chart showing causes of preventable death: heart disease 35%, cancer 28%, respiratory 15%, diabetes 12%, other 10%.", task2:"Governments should invest more in preventive healthcare rather than treating illness. Discuss both views and give your own opinion." },
    { task1:"A bar chart comparing urbanisation rates in 2000 vs 2023 across five regions: East Asia, South Asia, Sub-Saharan Africa, Europe, and Latin America.", task2:"The rapid growth of cities is creating serious social and environmental problems. To what extent do you agree?" },
    { task1:"A diagram showing the rise in electric vehicle sales (units) from 2018 to 2023 across China, Europe, and the USA.", task2:"Public transport should be made free to encourage people to abandon private vehicles. To what extent do you agree or disagree?" },
    { task1:"A line graph showing GDP growth rates (%) for Brazil, India, China and Germany from 2010 to 2023.", task2:"Free trade between countries benefits everyone. To what extent do you agree or disagree?" },
    { task1:"A table showing museum visitor numbers (millions) in 2015 and 2023: Louvre 8.7/8.9, British Museum 6.8/5.9, Vatican 6.0/7.2, MoMA 3.0/2.1.", task2:"Governments should spend money on arts and culture even when there are other pressing social needs. Discuss both views and give your own opinion." },
    { task1:"A line graph showing the number of scientific publications per year from 2000 to 2023, split by USA, China, and EU.", task2:"Scientific research should be directed by governments rather than private companies. To what extent do you agree?" },
    { task1:"A population pyramid comparing the age structure of Japan (2000 vs 2023), showing significant ageing.", task2:"Governments should encourage immigration to counteract the effects of an ageing population. Discuss both views." },
    { task1:"A bar chart comparing daily calorie intake vs recommended levels across six countries.", task2:"Fast food companies should be banned from advertising to children. To what extent do you agree or disagree?" },
    { task1:"A pie chart showing global energy consumption by source: oil 31%, coal 27%, gas 25%, renewables 12%, nuclear 5%.", task2:"Nuclear energy is the only realistic solution to the global energy crisis. To what extent do you agree?" },
    { task1:"A bar chart showing daily time spent on social media by age group (13–17, 18–29, 30–49, 50+) in 2023.", task2:"Social media has done more harm than good to society. To what extent do you agree or disagree?" },
    { task1:"A line graph showing Olympic participation by gender from 1896 to 2024, showing convergence.", task2:"Professional athletes are paid too much compared to other important professions. Discuss both views and give your opinion." },
    { task1:"A bar chart showing species extinction rates per decade from 1900 to 2020, with a sharp increase after 1980.", task2:"The protection of wild animals should be given priority over economic development. To what extent do you agree?" },
    { task1:"A diagram showing the components of a LEED-certified (green) building including solar panels, rainwater collection, and green roof.", task2:"Historic buildings should be preserved rather than demolished, even when land is needed for development. Discuss both views." },
    { task1:"A bar chart comparing self-reported happiness scores across 10 countries, with Finland highest and Afghanistan lowest.", task2:"Mental health should be treated with the same priority as physical health by governments and healthcare systems. Discuss." },
    { task1:"A timeline showing key archaeological discoveries in Egypt from 1799 to 2022.", task2:"Artefacts removed from their countries of origin should be returned. To what extent do you agree or disagree?" },
    { task1:"A table comparing trade volumes between major trading blocs (EU, ASEAN, NAFTA) in 2005 and 2023.", task2:"Globalisation has led to the destruction of local cultures and traditions. To what extent do you agree?" },
    { task1:"A bar chart showing annual space agency budgets (USD billions): NASA 25.4, ESA 7.2, CNSA 12.0, ISRO 1.5, JAXA 2.0.", task2:"Space exploration is a waste of money when there are so many problems on Earth. Discuss both views and give your opinion." },
    { task1:"A bar chart showing the number of languages spoken natively by continent, with Asia and Africa having the most.", task2:"Children should be taught a foreign language from the very start of their schooling. To what extent do you agree?" },
    { task1:"A line graph comparing international tourist arrivals (millions) before and after COVID-19, 2015–2023.", task2:"Tourism can be harmful to the places tourists visit. To what extent do you agree or disagree?" },
    { task1:"A line graph showing remote work adoption rates (%) in various industries from 2019 to 2024.", task2:"The traditional 9-to-5 working pattern is outdated and should be replaced with more flexible arrangements. Discuss." },
    { task1:"A bar chart showing public trust in institutions (government, media, science, religion) across four countries in 2023.", task2:"It is impossible to have a complete ethical code that applies to all people in all cultures. To what extent do you agree?" },
    { task1:"A line graph showing music streaming revenue (USD billions) vs physical music sales from 2010 to 2023.", task2:"Digital technology has fundamentally changed the nature of art and creativity. To what extent do you agree?" }
  ];

  const speakingTopics = [
    { p1:"health and lifestyle", p2t:"Describe a time when you overcame a physical or health challenge.", p3:"healthcare systems and responsibilities" },
    { p1:"your neighbourhood and city", p2t:"Describe a building or place in your city that you particularly like.", p3:"urban planning and community living" },
    { p1:"how you travel in daily life", p2t:"Describe a memorable journey or trip you have taken.", p3:"the future of transport and mobility" },
    { p1:"shopping and spending habits", p2t:"Describe a purchase you made that you were particularly happy with.", p3:"consumerism and its effects on society" },
    { p1:"art, music, or cultural activities you enjoy", p2t:"Describe a work of art (painting, sculpture, film) that moved you.", p3:"the role of art and culture in society" },
    { p1:"science and inventions that interest you", p2t:"Describe a scientific discovery or invention that you find fascinating.", p3:"the ethics and direction of scientific research" },
    { p1:"family life and relationships", p2t:"Describe an older person who has influenced you.", p3:"changing family structures in modern society" },
    { p1:"food preferences and cooking", p2t:"Describe a meal or food that is special to you.", p3:"food culture, diet, and public health policy" },
    { p1:"energy use in your home", p2t:"Describe a change you have made (or would like to make) to live more sustainably.", p3:"energy policy and individual responsibility" },
    { p1:"news and social media habits", p2t:"Describe a news story that had a significant effect on you.", p3:"media freedom, responsibility, and the internet" },
    { p1:"sports or physical activities you enjoy", p2t:"Describe a sporting event you watched or took part in.", p3:"the social role of sport and commercialisation" },
    { p1:"animals and nature", p2t:"Describe a natural environment or wild animal that interests you.", p3:"conservation policies and human impact on nature" },
    { p1:"your home and living environment", p2t:"Describe a place that you consider beautiful.", p3:"the relationship between design, space, and wellbeing" },
    { p1:"your emotions and mental wellbeing", p2t:"Describe a time when you felt particularly stressed and how you coped.", p3:"stress, mental health, and modern life" },
    { p1:"local history and heritage", p2t:"Describe a historical site or museum you have visited.", p3:"the importance of history and preserving the past" },
    { p1:"international experiences or travel abroad", p2t:"Describe an encounter with a different culture that affected your outlook.", p3:"the benefits and drawbacks of globalisation" },
    { p1:"science fiction, space, or future technology", p2t:"Describe a film, book, or programme about space that you enjoyed.", p3:"the importance of space exploration for humanity" },
    { p1:"languages you speak or want to learn", p2t:"Describe an experience of learning a foreign language.", p3:"the importance of language diversity and multilingual education" },
    { p1:"holidays and travel experiences", p2t:"Describe a place you have always wanted to visit.", p3:"responsible and sustainable tourism" },
    { p1:"your job, studies, or career plans", p2t:"Describe a person you know who is very good at their job.", p3:"work culture, automation, and the future of employment" },
    { p1:"right and wrong — a moral dilemma you have faced", p2t:"Describe a situation where you had to make a difficult decision.", p3:"ethics, values, and moral decision-making in society" },
    { p1:"music genres or concerts you enjoy", p2t:"Describe a song or piece of music that is meaningful to you.", p3:"music, culture, and the digital transformation of entertainment" }
  ];

  return condensedTopics.map((t, i) => {
    const lThemes = listeningThemes[i];
    const wt = writingTopics[i];
    const sp = speakingTopics[i];

    // Generate 4 listening sections × 10 questions each
    const sections = lThemes.map((desc, si) => {
      const baseNum = si * 10 + 1;
      const qs = [];
      for (let q = 0; q < 10; q++) {
        const num = baseNum + q;
        if (q % 2 === 0) {
          qs.push({ num, type:"fill", question:`According to the ${desc}, complete the note: Key point ${q+1} relates to the _______ aspect of ${t.topic.split(' ')[0].toLowerCase()}.`, answer:`main` });
        } else {
          qs.push({ num, type:"mc", question:`In the ${desc}, which statement is correct regarding ${t.topic.split(' ')[0].toLowerCase()}?`, options:[`A. It is increasing rapidly`,`B. It has remained unchanged`,`C. It is decreasing slightly`,`D. It varies significantly by region`], answer:`A` });
        }
      }
      return { description: `Based on ${desc}`, transcript: `This section is based on ${desc} covering topics related to ${t.topic}. The discussion highlights key developments, statistics, and perspectives from leading experts in the field. Students should listen for specific numbers, names, and factual statements that will be tested in the questions below.`, questions: qs };
    });

    // Generate 3 reading passages: P1 × 13, P2 × 13, P3 × 14 = 40 questions
    const passages = [1,2,3].map((pNum) => {
      const qs = [];
      const baseNum = (pNum-1)*13 + 1;
      for (let q = 0; q < 13; q++) {
        const num = baseNum + q;
        if (q % 3 === 0) {
          qs.push({ num, type:"fill", question:`According to paragraph ${String.fromCharCode(65+Math.floor(q/3))}, the primary factor in ${t.topic.split(' ')[0].toLowerCase()} is _______.`, answer:`development` });
        } else if (q % 3 === 1) {
          qs.push({ num, type:"mc", question:`In paragraph ${String.fromCharCode(65+Math.floor(q/3))}, what does the author suggest about ${t.topic.split(' ')[0].toLowerCase()}?`, options:[`A. It benefits society greatly`,`B. It requires government regulation`,`C. It has mixed effects on communities`,`D. It is primarily an economic issue`], answer:`C` });
        } else {
          qs.push({ num, type:"fill", question:`The author uses the word '_______ ' in paragraph ${String.fromCharCode(65+Math.floor(q/3))} to indicate importance.`, answer:`significant` });
        }
      }
      // Add Q40 to Passage 3 to reach the IELTS standard of 40 reading questions
      if (pNum === 3) {
        qs.push({ num:40, type:"mc", question:`According to paragraph E, which combination will be key to future success?`, options:[`A. Military strength and economic isolation`,`B. Institutional flexibility and long-term strategic vision`,`C. Rapid industrialisation and minimal regulation`,`D. Short-term profits and political centralisation`], answer:`B` });
      }
      return {
        title: `${t.topic}: Perspectives and Challenges — Part ${pNum}`,
        text: `<p><span class='para-label'>A</span>${t.topic} has become one of the most discussed topics in contemporary academic and policy discourse. Researchers from leading institutions have produced extensive studies examining its causes, effects, and potential solutions. The evidence base continues to grow as new methodologies allow for more precise measurement and analysis.</p>
<p><span class='para-label'>B</span>Historical perspectives reveal that ${t.topic.split(' ')[0].toLowerCase()} as we understand it today has evolved significantly over the past century. Early approaches were often narrow in scope, focusing on immediate effects rather than systemic causes. Contemporary scholarship takes a broader view, examining interconnections between social, economic, and environmental factors.</p>
<p><span class='para-label'>C</span>Policy responses have varied widely across different national and regional contexts. Some governments have adopted proactive regulatory frameworks, while others have preferred market-led approaches. International cooperation, though often challenging to achieve, has produced several landmark agreements that set shared standards and targets.</p>
<p><span class='para-label'>D</span>The role of technology in shaping outcomes related to ${t.topic.split(' ')[0].toLowerCase()} cannot be overstated. Digital platforms have transformed information access and citizen engagement, while advanced analytical tools allow policymakers to model complex scenarios with greater accuracy than ever before.</p>
<p><span class='para-label'>E</span>Looking ahead, experts project significant changes over the coming decades. Demographic shifts, technological disruption, and climate change will interact in complex ways with existing structures. The most successful societies will be those that combine institutional flexibility with long-term strategic vision and robust public investment in education and infrastructure.</p>`,
        questions: qs
      };
    });

    return {
      id: t.id,
      topic: t.topic,
      listening: { sections },
      reading: { passages },
      writing: {
        task1: { chart: wt.task1, prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
        task2: { prompt: wt.task2 }
      },
      speaking: {
        part1: { questions: [
          `Tell me about ${sp.p1}. How important is it to you?`,
          `How has your attitude to ${sp.p1} changed as you have grown older?`,
          `Do you think ${sp.p1} will change significantly in the next ten years?`,
          `How do people in your country generally feel about ${sp.p1}?`
        ]},
        part2: { topic: sp.p2t, points: ["What it involves", "When this happened or when you experienced it", "How you felt at the time", "What impact it had on you"], followUp: `How do you think your experience with ${sp.p1} compares with that of people in other countries?` },
        part3: { questions: [
          `What are the main challenges facing ${sp.p3} in your country today?`,
          `Do you think governments or individuals bear greater responsibility for issues related to ${sp.p3}?`,
          `How might globalisation affect ${sp.p3} over the next 20 years?`,
          `Some people believe that ${sp.p3} is not given enough attention by policymakers. Do you agree?`
        ]}
      }
    };
  });
})()

];
