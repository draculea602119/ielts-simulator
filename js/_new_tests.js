// TEST 4 — Health & Medicine
{
  id: 4, topic: "Health & Medicine",
  listening: { sections: [
    {
      description: "A phone call to a GP surgery booking a health check",
      transcript: "Receptionist: Good morning, Riverside Medical Centre, how can I help? Patient: Hello, I'd like to book a health check for my father. Receptionist: Of course. Can I take his full name? Patient: It's Gerald Whitmore. W-H-I-T-M-O-R-E. Receptionist: Date of birth? Patient: The fourteenth of March 1958. Receptionist: And his NHS number? Patient: 485 726 3190. Receptionist: The next available appointment is Wednesday the 8th of May at ten thirty in the morning. The check includes blood pressure, a cholesterol test, and a blood glucose test. It lasts forty minutes. Patient: Does he need to prepare? Receptionist: Yes, he must fast for twelve hours beforehand — no food or drink except water. Patient: Which doctor will he see? Receptionist: Dr Priya Nair. N-A-I-R. She's in Room 7 on the ground floor. Patient: Can I give a contact number? Receptionist: Please. Patient: It's 07712 884 501. Receptionist: Confirmed. We'll send a reminder text the day before.",
      questions: [
        { num:1, type:"fill", question:"The patient's surname is _______.", answer:"Whitmore" },
        { num:2, type:"fill", question:"The date of birth is the fourteenth of March _______.", answer:"1958" },
        { num:3, type:"fill", question:"The appointment is on Wednesday the _______ of May.", answer:"8th" },
        { num:4, type:"fill", question:"The appointment time is _______ in the morning.", answer:"ten thirty" },
        { num:5, type:"fill", question:"The appointment lasts _______ minutes.", answer:"forty" },
        { num:6, type:"mc", question:"Which test is NOT included in the health check?", options:["A. Blood pressure","B. Cholesterol","C. Blood glucose","D. Kidney function"], answer:"D" },
        { num:7, type:"fill", question:"The patient must fast for _______ hours before the appointment.", answer:"twelve" },
        { num:8, type:"fill", question:"The doctor's name is Dr Priya _______.", answer:"Nair" },
        { num:9, type:"mc", question:"Where is the doctor's room located?", options:["A. First floor","B. Second floor","C. Ground floor","D. Basement"], answer:"C" },
        { num:10, type:"mc", question:"How will the patient be reminded about the appointment?", options:["A. By email","B. By letter","C. By phone call","D. By text message"], answer:"D" }
      ]
    },
    {
      description: "A radio documentary about the global rise in diabetes",
      transcript: "Narrator: Diabetes is one of the fastest-growing health crises of the twenty-first century. According to the International Diabetes Federation, approximately 537 million adults worldwide were living with diabetes in 2021 — a figure projected to reach 783 million by 2045. Type 2 diabetes, which accounts for around 90 percent of all cases, is largely preventable through diet and exercise. The disease costs global health systems an estimated 966 billion US dollars annually. In the United Kingdom, one in ten hospital beds is occupied by a person with diabetes-related complications. The country with the highest proportion of adults with diabetes is Pakistan, where 30.8 percent of adults are affected. Low- and middle-income countries bear 80 percent of the global diabetes burden. Experts recommend reducing daily sugar intake to under 25 grams and taking at least 150 minutes of moderate exercise per week.",
      questions: [
        { num:11, type:"fill", question:"Approximately _______ million adults worldwide had diabetes in 2021.", answer:"537" },
        { num:12, type:"fill", question:"This figure is projected to reach _______ million by 2045.", answer:"783" },
        { num:13, type:"mc", question:"What percentage of diabetes cases are Type 2?", options:["A. 70%","B. 80%","C. 90%","D. 95%"], answer:"C" },
        { num:14, type:"fill", question:"Diabetes costs global health systems _______ billion US dollars annually.", answer:"966" },
        { num:15, type:"mc", question:"In the UK, what fraction of hospital beds are occupied by diabetes patients?", options:["A. One in five","B. One in eight","C. One in ten","D. One in twelve"], answer:"C" },
        { num:16, type:"fill", question:"The country with the highest proportion of adult diabetes is _______.", answer:"Pakistan" },
        { num:17, type:"fill", question:"In Pakistan, _______ percent of adults are affected.", answer:"30.8" },
        { num:18, type:"mc", question:"What percentage of the global diabetes burden falls on low- and middle-income countries?", options:["A. 60%","B. 70%","C. 75%","D. 80%"], answer:"D" },
        { num:19, type:"fill", question:"The recommended daily sugar intake is under _______ grams.", answer:"25" },
        { num:20, type:"fill", question:"The recommended amount of moderate exercise per week is at least _______ minutes.", answer:"150" }
      ]
    },
    {
      description: "Students discussing a research project on vaccination rates",
      transcript: "Elena: Our report is on vaccine hesitancy in Europe. We need to cite WHO data. Marcus: The WHO found that measles vaccination coverage dropped below 95 percent — the herd immunity threshold — in 26 European countries in 2022. Elena: There were over 306,000 measles cases globally in 2023, a 79 percent increase on the previous year. Marcus: Our hypothesis is that social media misinformation is the primary driver. Professor Adeyemi suggested we look at the Lancet paper from 2023 — it surveyed 15,000 adults across 23 countries. Sofia: I found it. The paper found that 67 percent of hesitant individuals had encountered anti-vaccine content online in the previous month. Marcus: We should also include the UK case study — MMR uptake fell to 84 percent in London in 2022. Elena: We need a minimum of ten references. The draft is due November 30th.",
      questions: [
        { num:21, type:"fill", question:"Measles vaccination coverage dropped below _______ percent in 26 European countries.", answer:"95" },
        { num:22, type:"fill", question:"There were over _______ measles cases globally in 2023.", answer:"306,000" },
        { num:23, type:"fill", question:"This represented a _______ percent increase on the previous year.", answer:"79" },
        { num:24, type:"mc", question:"What does the group identify as the primary driver of vaccine hesitancy?", options:["A. Religious beliefs","B. Government policy","C. Social media misinformation","D. Lack of education"], answer:"C" },
        { num:25, type:"fill", question:"The Lancet paper surveyed _______ adults.", answer:"15,000" },
        { num:26, type:"fill", question:"The survey covered _______ countries.", answer:"23" },
        { num:27, type:"mc", question:"What percentage of hesitant individuals encountered anti-vaccine content online?", options:["A. 57%","B. 62%","C. 67%","D. 72%"], answer:"C" },
        { num:28, type:"fill", question:"MMR uptake in London fell to _______ percent in 2022.", answer:"84" },
        { num:29, type:"fill", question:"The report requires a minimum of _______ references.", answer:"ten" },
        { num:30, type:"mc", question:"When is the draft due?", options:["A. November 13th","B. November 20th","C. November 30th","D. December 1st"], answer:"C" }
      ]
    },
    {
      description: "An academic lecture on antibiotics and antimicrobial resistance",
      transcript: "Lecturer: In 1928, Alexander Fleming discovered penicillin when he noticed that a mould called Penicillium notatum was killing bacteria on a petri dish. Mass production began during World War Two, and by 1944 penicillin was saving thousands of soldiers from wound infections. Today, antibiotics treat bacterial infections, but they are entirely ineffective against viruses. Globally, antimicrobial resistance — or AMR — is one of the greatest threats to modern medicine. The WHO estimates that by 2050, drug-resistant infections could kill 10 million people per year — more than cancer kills today. Studies show that 50 percent of antibiotic prescriptions in the United States are either unnecessary or inappropriate. In livestock farming, antibiotics are routinely used to promote growth, accounting for approximately 73 percent of all antibiotic use globally.",
      questions: [
        { num:31, type:"fill", question:"Alexander Fleming discovered penicillin in _______.", answer:"1928" },
        { num:32, type:"fill", question:"The mould responsible was called Penicillium _______.", answer:"notatum" },
        { num:33, type:"fill", question:"Mass production began during World War _______.", answer:"Two" },
        { num:34, type:"mc", question:"Antibiotics are effective against which type of infection?", options:["A. Viral","B. Bacterial","C. Fungal","D. Parasitic"], answer:"B" },
        { num:35, type:"fill", question:"AMR stands for antimicrobial _______.", answer:"resistance" },
        { num:36, type:"mc", question:"How many people could AMR kill per year by 2050?", options:["A. 5 million","B. 7 million","C. 10 million","D. 15 million"], answer:"C" },
        { num:37, type:"fill", question:"_______ percent of antibiotic prescriptions in the US are unnecessary or inappropriate.", answer:"50" },
        { num:38, type:"fill", question:"Antibiotics in livestock account for approximately _______ percent of all antibiotic use globally.", answer:"73" },
        { num:39, type:"mc", question:"Why are antibiotics used in livestock farming?", options:["A. To treat disease outbreaks","B. To promote growth","C. To prevent viral infections","D. To reduce costs"], answer:"B" },
        { num:40, type:"mc", question:"Fleming noticed the mould was killing bacteria on a:", options:["A. glass slide","B. microscope","C. petri dish","D. culture bottle"], answer:"C" }
      ]
    }
  ]},
  reading: { passages: [
    {
      title: "The Global Burden of Non-Communicable Diseases",
      text: "<p><span class='para-label'>A</span>Non-communicable diseases — or NCDs — are the leading cause of death worldwide, responsible for 74 percent of all deaths globally according to the World Health Organisation. Unlike infectious diseases, NCDs are not transmitted between individuals. The four main types are cardiovascular diseases, cancers, chronic respiratory diseases, and diabetes. Together they cause 41 million deaths per year. Cardiovascular diseases alone account for 17.9 million annual deaths, making them the single largest killer. Low- and middle-income countries are disproportionately affected, bearing 77 percent of all NCD deaths.</p>\n<p><span class='para-label'>B</span>The primary modifiable risk factors for NCDs are well established: tobacco use, physical inactivity, unhealthy diet, and the harmful use of alcohol. Tobacco kills more than 8 million people each year, including 1.2 million through second-hand smoke exposure. Physical inactivity is estimated to cause 3.2 million deaths annually and is the fourth leading risk factor for global mortality. The WHO recommends that adults undertake at least 150 minutes of moderate-intensity aerobic activity per week.</p>\n<p><span class='para-label'>C</span>Prevention is substantially more cost-effective than treatment. The World Economic Forum estimates that NCDs will cost the global economy 47 trillion US dollars between 2011 and 2030 — primarily through lost productivity rather than direct healthcare costs. Preventive interventions such as tobacco taxes, salt reduction in processed foods, and urban planning that encourages walking and cycling yield significant returns. For every one dollar invested in NCD prevention, studies suggest returns of between seven and nine dollars in reduced healthcare costs and increased economic productivity.</p>\n<p><span class='para-label'>D</span>Despite evidence supporting prevention, health systems in most countries remain oriented toward acute care — treating illness rather than preventing it. Hospital-based care dominates health budgets. In the United States, only 2.9 percent of total health expenditure is directed toward public health and prevention. Structural barriers include the dominance of pharmaceutical and insurance industries, political short-termism, and the difficulty of attributing benefits from prevention, which occur gradually and invisibly over decades.</p>\n<p><span class='para-label'>E</span>Global initiatives are attempting to shift the balance. The WHO's Global Action Plan for NCDs covers the period 2013 to 2030 and sets nine voluntary targets, including a 33 percent reduction in premature NCD mortality. The plan emphasises multisectoral action — engaging education, agriculture, urban planning, and finance ministries, not just health departments. However, progress has been uneven, with many countries reporting insufficient political will and inadequate funding to implement recommended policies.</p>",
      questions: [
        { num:1, type:"fill", question:"NCDs are responsible for _______ percent of all deaths globally.", answer:"74" },
        { num:2, type:"fill", question:"NCDs cause _______ million deaths per year.", answer:"41" },
        { num:3, type:"mc", question:"Which disease type is the single largest killer?", options:["A. Cancer","B. Diabetes","C. Cardiovascular disease","D. Respiratory disease"], answer:"C" },
        { num:4, type:"fill", question:"Cardiovascular diseases cause _______ million deaths annually.", answer:"17.9" },
        { num:5, type:"mc", question:"What percentage of NCD deaths occur in low- and middle-income countries?", options:["A. 67%","B. 72%","C. 77%","D. 82%"], answer:"C" },
        { num:6, type:"fill", question:"Tobacco kills more than _______ million people each year.", answer:"8" },
        { num:7, type:"fill", question:"Physical inactivity is the _______ leading risk factor for global mortality.", answer:"fourth" },
        { num:8, type:"mc", question:"What is the estimated cost of NCDs to the global economy from 2011 to 2030?", options:["A. $27 trillion","B. $37 trillion","C. $47 trillion","D. $57 trillion"], answer:"C" },
        { num:9, type:"fill", question:"For every one dollar invested in prevention, returns of between _______ and nine dollars are suggested.", answer:"seven" },
        { num:10, type:"mc", question:"What percentage of US health expenditure goes to public health and prevention?", options:["A. 1.9%","B. 2.9%","C. 3.9%","D. 4.9%"], answer:"B" },
        { num:11, type:"fill", question:"The WHO's Global Action Plan for NCDs covers 2013 to _______.", answer:"2030" },
        { num:12, type:"fill", question:"The plan targets a _______ percent reduction in premature NCD mortality.", answer:"33" },
        { num:13, type:"mc", question:"Which of the following is described as a barrier to prevention in paragraph D?", options:["A. Lack of research","B. Political short-termism","C. Public resistance","D. Shortage of doctors"], answer:"B" }
      ]
    },
    {
      title: "Mental Health: The Hidden Epidemic",
      text: "<p><span class='para-label'>A</span>Mental health disorders affect approximately one in eight people worldwide — roughly 970 million individuals — according to the 2022 Global Burden of Disease study. Depression and anxiety are the most prevalent, together affecting over 700 million people. Despite their enormous burden, mental health conditions receive a disproportionately small share of health budgets. The WHO reports that globally, governments spend on average just 2 percent of their health budgets on mental health. In low-income countries, this figure falls to less than 1 percent.</p>\n<p><span class='para-label'>B</span>The economic cost of untreated mental health conditions is staggering. The World Economic Forum estimates that mental disorders will cost the global economy 16 trillion US dollars between 2011 and 2030 — more than cancer, diabetes, and respiratory diseases combined. Lost productivity, absenteeism, and reduced participation in the labour force account for the majority of this figure. In the United Kingdom, mental ill health costs employers approximately 56 billion pounds per year.</p>\n<p><span class='para-label'>C</span>Stigma remains one of the most significant barriers to seeking help. Studies show that only around 20 to 30 percent of people with mental health conditions in high-income countries receive appropriate treatment — in low-income settings, this falls below 10 percent. The treatment gap is compounded by a chronic shortage of mental health professionals. The global average is just 13 mental health workers per 100,000 people, with low-income countries averaging fewer than 2.</p>\n<p><span class='para-label'>D</span>The COVID-19 pandemic dramatically worsened the global mental health situation. WHO surveys found a 25 percent increase in the prevalence of anxiety and depression worldwide during the first year of the pandemic. Young people and women were disproportionately affected. Lockdown measures, social isolation, bereavement, and economic uncertainty all contributed to the deterioration in mental wellbeing observed across countries.</p>\n<p><span class='para-label'>E</span>Digital technologies are increasingly deployed to address the treatment gap. Mobile mental health applications, online therapy platforms, and AI-powered chatbots are reaching populations that previously had no access to care. A 2022 meta-analysis of 83 studies found that app-based cognitive behavioural therapy was effective in reducing symptoms of anxiety and depression. However, concerns remain about data privacy, the quality of unregulated apps, and whether digital tools can truly replicate the therapeutic relationship.</p>",
      questions: [
        { num:14, type:"fill", question:"Mental health disorders affect approximately _______ million people worldwide.", answer:"970" },
        { num:15, type:"mc", question:"What percentage of health budgets do governments globally spend on mental health?", options:["A. 1%","B. 2%","C. 5%","D. 8%"], answer:"B" },
        { num:16, type:"fill", question:"Mental disorders will cost the global economy _______ trillion US dollars by 2030.", answer:"16" },
        { num:17, type:"fill", question:"Mental ill health costs UK employers approximately _______ billion pounds per year.", answer:"56" },
        { num:18, type:"mc", question:"In high-income countries, what percentage of people with mental conditions receive appropriate treatment?", options:["A. 10–20%","B. 20–30%","C. 30–40%","D. 40–50%"], answer:"B" },
        { num:19, type:"fill", question:"The global average is just _______ mental health workers per 100,000 people.", answer:"13" },
        { num:20, type:"mc", question:"By how much did anxiety and depression increase globally in the first year of the pandemic?", options:["A. 15%","B. 20%","C. 25%","D. 30%"], answer:"C" },
        { num:21, type:"fill", question:"The 2022 meta-analysis examined _______ studies on app-based CBT.", answer:"83" },
        { num:22, type:"mc", question:"Which concern about digital mental health tools is mentioned in paragraph E?", options:["A. High cost","B. Data privacy","C. Government regulation","D. Lack of users"], answer:"B" },
        { num:23, type:"fill", question:"Depression and anxiety together affect over _______ million people.", answer:"700" },
        { num:24, type:"mc", question:"Who were disproportionately affected by the pandemic's mental health impact?", options:["A. Elderly men and boys","B. Young people and women","C. Children under ten","D. Healthcare workers only"], answer:"B" },
        { num:25, type:"fill", question:"In low-income countries, fewer than _______ mental health workers exist per 100,000 people.", answer:"2" },
        { num:26, type:"mc", question:"App-based CBT was found effective at reducing symptoms of:", options:["A. Schizophrenia and psychosis","B. Anxiety and depression","C. Bipolar disorder and OCD","D. PTSD and dementia"], answer:"B" }
      ]
    },
    {
      title: "Advances in Cancer Treatment",
      text: "<p><span class='para-label'>A</span>Cancer is the second leading cause of death globally, responsible for an estimated 10 million deaths in 2020 according to the World Health Organisation. One in six deaths worldwide is attributable to cancer. The most common cancers are breast, lung, colon, rectum, and prostate. However, the landscape of cancer treatment has been transformed over the past three decades. In the United States, the overall five-year cancer survival rate has risen from 49 percent in the 1970s to 69 percent today.</p>\n<p><span class='para-label'>B</span>Immunotherapy has emerged as one of the most significant breakthroughs in oncology. Unlike chemotherapy, which attacks all rapidly dividing cells indiscriminately, immunotherapy harnesses the body's own immune system to identify and destroy cancer cells. Checkpoint inhibitors — drugs that remove molecular brakes on the immune system — have produced remarkable results in melanoma, lung cancer, and bladder cancer. The 2018 Nobel Prize in Physiology or Medicine was awarded to James Allison and Tasuku Honjo for their discoveries underpinning checkpoint inhibitor therapy.</p>\n<p><span class='para-label'>C</span>CAR-T cell therapy represents a further frontier. In this approach, a patient's T cells are extracted, genetically engineered to carry a chimeric antigen receptor (CAR) that targets cancer cells, and then reinfused into the patient. For certain blood cancers — including acute lymphoblastic leukaemia in children — CAR-T therapy has achieved complete remission rates exceeding 80 percent. However, the treatment costs up to 475,000 US dollars per patient, limiting access in low-income settings.</p>\n<p><span class='para-label'>D</span>Early detection remains the most powerful tool for improving cancer outcomes. Screening programmes for cervical, breast, and colorectal cancers have substantially reduced mortality in countries that have implemented them. The human papillomavirus (HPV) vaccine, introduced in many countries since 2006, is expected to eliminate cervical cancer as a public health problem in nations with high vaccination coverage. Modelling studies suggest cervical cancer could be effectively eliminated in over 100 countries by 2100.</p>\n<p><span class='para-label'>E</span>Artificial intelligence is increasingly applied to cancer diagnostics. A 2023 study published in Nature Medicine demonstrated that an AI system could detect breast cancer in mammograms with greater accuracy than two radiologists working independently, reducing false positives by 5.7 percent and false negatives by 9.4 percent. The integration of AI into routine pathology and radiology is anticipated to reduce diagnostic delays and improve patient outcomes globally.</p>",
      questions: [
        { num:27, type:"fill", question:"Cancer caused an estimated _______ million deaths in 2020.", answer:"10" },
        { num:28, type:"mc", question:"Cancer is the _______ leading cause of death globally.", options:["A. first","B. second","C. third","D. fourth"], answer:"B" },
        { num:29, type:"fill", question:"The US five-year cancer survival rate has risen to _______ percent today.", answer:"69" },
        { num:30, type:"mc", question:"What was the US five-year survival rate in the 1970s?", options:["A. 39%","B. 44%","C. 49%","D. 54%"], answer:"C" },
        { num:31, type:"fill", question:"The 2018 Nobel Prize was awarded to James Allison and Tasuku _______.", answer:"Honjo" },
        { num:32, type:"mc", question:"What do checkpoint inhibitors do?", options:["A. Directly kill tumour cells","B. Remove molecular brakes on the immune system","C. Block blood supply to tumours","D. Introduce cancer-fighting viruses"], answer:"B" },
        { num:33, type:"fill", question:"CAR stands for chimeric antigen _______.", answer:"receptor" },
        { num:34, type:"fill", question:"CAR-T therapy achieved complete remission rates exceeding _______ percent.", answer:"80" },
        { num:35, type:"mc", question:"How much can CAR-T therapy cost per patient?", options:["A. $175,000","B. $275,000","C. $375,000","D. $475,000"], answer:"D" },
        { num:36, type:"fill", question:"The HPV vaccine was introduced in many countries since _______.", answer:"2006" },
        { num:37, type:"mc", question:"By when could cervical cancer be eliminated in over 100 countries?", options:["A. 2050","B. 2070","C. 2100","D. 2150"], answer:"C" },
        { num:38, type:"fill", question:"The AI breast cancer study was published in _______ Medicine.", answer:"Nature" },
        { num:39, type:"fill", question:"The AI system reduced false negatives by _______ percent.", answer:"9.4" },
        { num:40, type:"mc", question:"The AI system in the study detected cancer in:", options:["A. blood samples","B. X-rays","C. mammograms","D. MRI scans"], answer:"C" }
      ]
    }
  ]},
  writing: {
    task1: { chart: "A pie chart showing causes of preventable death: heart disease 35%, cancer 28%, respiratory 15%, diabetes 12%, other 10%.", prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt: "Governments should invest more in preventive healthcare rather than treating illness. Discuss both views and give your own opinion." }
  },
  speaking: {
    part1: { questions: ["Do you try to live a healthy lifestyle? What do you do to stay healthy?","How important is diet compared to exercise in maintaining good health?","Have attitudes towards health and fitness changed in your country in recent years?","Do you think people today are more health-conscious than previous generations?"] },
    part2: { topic: "Describe a time when you overcame a physical or health challenge.", points: ["What the challenge was","When it happened","How you dealt with it","What you learned from the experience"], followUp: "Do you think mental resilience is as important as physical fitness when dealing with health problems?" },
    part3: { questions: ["Should governments take more responsibility for the health of their citizens by taxing unhealthy foods?","How effective are public health campaigns in changing people's behaviour?","Do you think access to healthcare should be equal for everyone, regardless of income?","How might advances in technology change the way we manage our health in the future?"] }
  }
},

// TEST 5 — Urban Development
{
  id: 5, topic: "Urban Development",
  listening: { sections: [
    {
      description: "A phone enquiry about a new housing development",
      transcript: "Agent: Good afternoon, Hartfield Properties, this is Diane speaking. Caller: Hello, I'm calling about the Greenway Park development. I saw the advertisement in the Herald newspaper. Agent: Of course. Greenway Park is a new residential development in the Eastgate district of Millfield. We have two-bedroom and three-bedroom apartments available. Caller: What are the prices? Agent: Two-bedroom units start from £285,000, and three-bedroom units from £420,000. Caller: When will the first phase be ready? Agent: Phase One completes on the 1st of September next year. There are 48 units in Phase One. Caller: Is there parking included? Agent: Yes, every unit comes with one allocated parking space. Additional spaces can be purchased for £15,000 each. Caller: Are there any service charges? Agent: Yes, the annual service charge is £1,800. That covers maintenance of communal areas and a 24-hour concierge. Caller: My name is Patrick Sanderson. Can I register my interest? Agent: Absolutely. I'll need your email address and a deposit of £500 to hold a reservation.",
      questions: [
        { num:1, type:"fill", question:"The development is located in the Eastgate district of _______.", answer:"Millfield" },
        { num:2, type:"fill", question:"Two-bedroom units start from £_______.", answer:"285,000" },
        { num:3, type:"fill", question:"Three-bedroom units start from £_______.", answer:"420,000" },
        { num:4, type:"fill", question:"Phase One completes on the 1st of _______ next year.", answer:"September" },
        { num:5, type:"fill", question:"There are _______ units in Phase One.", answer:"48" },
        { num:6, type:"mc", question:"What is included with every unit?", options:["A. Two parking spaces","B. One allocated parking space","C. A garage","D. No parking"], answer:"B" },
        { num:7, type:"fill", question:"Additional parking spaces cost £_______ each.", answer:"15,000" },
        { num:8, type:"fill", question:"The annual service charge is £_______.", answer:"1,800" },
        { num:9, type:"mc", question:"What does the service charge cover?", options:["A. Utilities and broadband","B. Communal maintenance and concierge","C. Building insurance only","D. Garden maintenance only"], answer:"B" },
        { num:10, type:"mc", question:"What is required to hold a reservation?", options:["A. £200 deposit","B. £500 deposit","C. £1,000 deposit","D. Full payment"], answer:"B" }
      ]
    },
    {
      description: "A radio programme about urbanisation trends worldwide",
      transcript: "Presenter: By 2050, approximately 68 percent of the world's population will live in cities, up from 55 percent today, according to the United Nations. The fastest urbanisation is occurring in Africa and Asia, where cities are growing at a rate of 3.5 percent per year. Lagos in Nigeria is projected to overtake Cairo as Africa's largest city by 2030, reaching a population of 24 million. In contrast, many European cities are experiencing population decline — Leipzig in Germany lost 20 percent of its population between 1989 and 2000 before successfully regenerating through culture-led development. The UN-Habitat programme estimates that one billion people currently live in informal settlements — commonly called slums — without access to clean water, sanitation, or secure tenure. The number of megacities — those with populations exceeding 10 million — has grown from 10 in 1990 to 33 today.",
      questions: [
        { num:11, type:"fill", question:"By 2050, approximately _______ percent of the world's population will live in cities.", answer:"68" },
        { num:12, type:"fill", question:"Currently _______ percent of the world's population lives in cities.", answer:"55" },
        { num:13, type:"mc", question:"Where is the fastest urbanisation occurring?", options:["A. Europe and North America","B. Africa and Asia","C. South America and Australia","D. Middle East and Central Asia"], answer:"B" },
        { num:14, type:"fill", question:"Cities in Africa and Asia are growing at _______ percent per year.", answer:"3.5" },
        { num:15, type:"fill", question:"Lagos is projected to reach a population of _______ million by 2030.", answer:"24" },
        { num:16, type:"mc", question:"By when will Lagos overtake Cairo as Africa's largest city?", options:["A. 2025","B. 2030","C. 2035","D. 2040"], answer:"B" },
        { num:17, type:"fill", question:"Leipzig lost _______ percent of its population between 1989 and 2000.", answer:"20" },
        { num:18, type:"mc", question:"How did Leipzig regenerate its population?", options:["A. Industrial investment","B. Tourism campaigns","C. Culture-led development","D. Government subsidies"], answer:"C" },
        { num:19, type:"fill", question:"One _______ people currently live in informal settlements worldwide.", answer:"billion" },
        { num:20, type:"fill", question:"The number of megacities has grown from 10 in 1990 to _______ today.", answer:"33" }
      ]
    },
    {
      description: "A university seminar on smart city technologies",
      transcript: "Professor: Today we look at smart cities — urban areas that use digital technology to improve infrastructure and services. Singapore is often cited as the world's leading smart city. Its Smart Nation initiative, launched in 2014, integrates data from 110,000 government sensors across the island. The city-state has reduced its traffic congestion by 30 percent through dynamic road pricing, first introduced in 1998. Dr Yamamoto: In Barcelona, a smart irrigation system in parks reduced water usage by 25 percent, saving the city 530,000 euros per year. The city embedded 19,500 smart meters in footpaths to monitor pedestrian flow. Student A: Aren't there privacy concerns? Professor: Absolutely. A 2022 survey by the Pew Research Center found that 72 percent of urban residents in smart cities felt their data was being collected without full transparency. The tension between efficiency and civil liberties remains a central challenge for smart city governance.",
      questions: [
        { num:21, type:"fill", question:"Singapore's Smart Nation initiative was launched in _______.", answer:"2014" },
        { num:22, type:"fill", question:"Singapore integrates data from _______ government sensors.", answer:"110,000" },
        { num:23, type:"fill", question:"Singapore reduced traffic congestion by _______ percent.", answer:"30" },
        { num:24, type:"mc", question:"When was dynamic road pricing first introduced in Singapore?", options:["A. 1988","B. 1993","C. 1998","D. 2003"], answer:"C" },
        { num:25, type:"fill", question:"Barcelona's smart irrigation system reduced water usage by _______ percent.", answer:"25" },
        { num:26, type:"fill", question:"Barcelona's smart irrigation saves _______ euros per year.", answer:"530,000" },
        { num:27, type:"fill", question:"Barcelona embedded _______ smart meters in footpaths.", answer:"19,500" },
        { num:28, type:"mc", question:"What do the Barcelona footpath sensors monitor?", options:["A. Air quality","B. Temperature","C. Pedestrian flow","D. Noise levels"], answer:"C" },
        { num:29, type:"mc", question:"According to the Pew survey, what percentage of smart city residents felt their data lacked transparency?", options:["A. 52%","B. 62%","C. 72%","D. 82%"], answer:"C" },
        { num:30, type:"fill", question:"The tension between efficiency and _______ liberties is a central challenge.", answer:"civil" }
      ]
    },
    {
      description: "A lecture on affordable housing crises in global cities",
      transcript: "Lecturer: Housing affordability is measured by the price-to-income ratio — the median house price divided by median annual household income. A ratio above 5 is considered severely unaffordable. In 2023, Hong Kong recorded the world's highest ratio at 18.8, meaning a household must save its entire income for nearly 19 years to afford an average home. Sydney came second at 13.3, followed by Vancouver at 12.3 and San Francisco at 11.0. London's ratio stands at 8.9. The fundamental cause is a supply shortage relative to demand, worsened by restrictive zoning laws. In Tokyo, by contrast, liberal planning laws allow rapid construction — its price-to-income ratio is just 4.8, making it one of the most affordable major cities despite being the world's largest urban area. Vienna's social housing programme — in which 60 percent of residents live in publicly owned or subsidised housing — is widely regarded as the most successful model in the developed world.",
      questions: [
        { num:31, type:"fill", question:"A price-to-income ratio above _______ is considered severely unaffordable.", answer:"5" },
        { num:32, type:"fill", question:"Hong Kong's price-to-income ratio in 2023 was _______.", answer:"18.8" },
        { num:33, type:"fill", question:"Sydney's ratio was _______.", answer:"13.3" },
        { num:34, type:"mc", question:"Which city had the third highest price-to-income ratio?", options:["A. San Francisco","B. London","C. Vancouver","D. Tokyo"], answer:"C" },
        { num:35, type:"fill", question:"London's price-to-income ratio stands at _______.", answer:"8.9" },
        { num:36, type:"mc", question:"What is identified as the fundamental cause of unaffordability?", options:["A. High interest rates","B. Foreign investment","C. Supply shortage relative to demand","D. Excessive taxation"], answer:"C" },
        { num:37, type:"fill", question:"Tokyo's price-to-income ratio is _______.", answer:"4.8" },
        { num:38, type:"mc", question:"Why does Tokyo remain affordable despite being the world's largest urban area?", options:["A. Government price controls","B. Liberal planning laws","C. Low demand for housing","D. Mass social housing"], answer:"B" },
        { num:39, type:"fill", question:"In Vienna, _______ percent of residents live in publicly owned or subsidised housing.", answer:"60" },
        { num:40, type:"mc", question:"Vienna's social housing programme is regarded as the most successful model in:", options:["A. Eastern Europe","B. The developing world","C. The developed world","D. Continental Europe"], answer:"C" }
      ]
    }
  ]},
  reading: { passages: [
    {
      title: "The Rise of the Megacity",
      text: "<p><span class='para-label'>A</span>A megacity is conventionally defined as an urban agglomeration with a population exceeding ten million people. In 1950, there were only two such cities in the world: New York and Tokyo. By 2023, the number had risen to 33, and the United Nations projects that there will be 43 megacities by 2030. The majority of these will be located in Asia and Africa, reflecting demographic and economic shifts that are fundamentally reshaping global settlement patterns. Tokyo remains the world's largest urban area, with a population of approximately 37.4 million, followed by Delhi at 32.9 million and Shanghai at 28.5 million.</p>\n<p><span class='para-label'>B</span>The growth of megacities creates significant governance challenges. Administering populations that rival or exceed those of many nation-states requires coordination across multiple layers of government, which is often fragmented and inadequate. Infrastructure systems — water, sewage, electricity, and transport — strain under the pressure of rapid population growth. In many rapidly growing megacities, informal settlements expand faster than formal planning systems can accommodate, creating vast areas without legal tenure, adequate sanitation, or reliable utilities.</p>\n<p><span class='para-label'>C</span>Economic agglomeration is a key driver of megacity growth. Economists have long documented that cities become more productive as they grow — a phenomenon known as urban scaling. When a city doubles in size, GDP per capita increases by approximately 15 percent due to knowledge spillovers, specialised labour markets, and the density of business interactions. This economic gravitational pull draws migrants from rural areas and smaller cities, creating self-reinforcing cycles of growth that are difficult to reverse through policy.</p>\n<p><span class='para-label'>D</span>Environmental pressures are severe. Megacities consume a disproportionate share of global resources: though cities occupy just 3 percent of the Earth's land surface, they account for approximately 75 percent of global energy consumption and generate 70 percent of global carbon emissions. Air quality in many Asian megacities — particularly Delhi, Dhaka, and Lahore — regularly exceeds WHO safety thresholds by factors of ten or more. Particulate matter pollution causes an estimated 7 million premature deaths globally each year.</p>\n<p><span class='para-label'>E</span>Urban planners are increasingly exploring polycentric models — developing multiple urban centres within a wider metropolitan region — as an alternative to continued concentration in a single core. China's Jing-Jin-Ji mega-region, integrating Beijing, Tianjin, and Hebei province into a planned urban network of 130 million people, represents the most ambitious experiment in deliberate polycentric urban development. Critics argue, however, that such top-down planning approaches often underestimate the organic economic and social processes that drive urban growth.</p>",
      questions: [
        { num:1, type:"fill", question:"In 1950, there were only _______ megacities in the world.", answer:"two" },
        { num:2, type:"fill", question:"By 2023, the number of megacities had risen to _______.", answer:"33" },
        { num:3, type:"mc", question:"Where will the majority of new megacities be located by 2030?", options:["A. Europe and North America","B. Latin America and Australia","C. Asia and Africa","D. Middle East and Central Asia"], answer:"C" },
        { num:4, type:"fill", question:"Tokyo's population is approximately _______ million.", answer:"37.4" },
        { num:5, type:"mc", question:"Which city is listed as the second largest urban area?", options:["A. Shanghai","B. Mumbai","C. Delhi","D. Beijing"], answer:"C" },
        { num:6, type:"fill", question:"When a city doubles in size, GDP per capita increases by approximately _______ percent.", answer:"15" },
        { num:7, type:"fill", question:"Cities occupy just _______ percent of the Earth's land surface.", answer:"3" },
        { num:8, type:"mc", question:"What percentage of global energy consumption do cities account for?", options:["A. 55%","B. 65%","C. 75%","D. 85%"], answer:"C" },
        { num:9, type:"fill", question:"Particulate matter pollution causes an estimated _______ million premature deaths each year.", answer:"7" },
        { num:10, type:"mc", question:"What is urban scaling?", options:["A. Reducing city populations","B. Cities becoming more productive as they grow","C. Planning new satellite towns","D. Measuring urban land use"], answer:"B" },
        { num:11, type:"fill", question:"China's Jing-Jin-Ji mega-region plans an urban network of _______ million people.", answer:"130" },
        { num:12, type:"mc", question:"What model do urban planners increasingly favour as an alternative to single-core concentration?", options:["A. Garden city model","B. Polycentric model","C. Transit-oriented development","D. New urbanism"], answer:"B" },
        { num:13, type:"fill", question:"Cities generate _______ percent of global carbon emissions.", answer:"70" }
      ]
    },
    {
      title: "Green Urbanism: Designing Sustainable Cities",
      text: "<p><span class='para-label'>A</span>Green urbanism refers to the design and planning of cities in ways that minimise environmental impact while maximising quality of life for residents. It draws on principles from ecology, urban design, and social science to create urban environments that are resilient, resource-efficient, and liveable. Pioneered by thinkers such as Jan Gehl and Richard Rogers, green urbanism challenges the assumptions of twentieth-century car-centric city planning, arguing that compact, walkable, mixed-use urban form is both more sustainable and more conducive to human wellbeing than sprawling suburban development.</p>\n<p><span class='para-label'>B</span>The city of Curitiba in Brazil is often cited as an early and influential model of green urban planning. Under the leadership of architect-mayor Jaime Lerner, who served three terms beginning in 1971, Curitiba pioneered a bus rapid transit (BRT) system that carries 2.3 million passengers per day — comparable to metro systems costing far more. The city has 52 square metres of green space per resident, compared to the WHO minimum recommendation of 9 square metres. Recycling rates reached 70 percent by the 1990s, achieved partly through a pioneering waste-for-food programme in which residents exchanged recyclables for fresh produce.</p>\n<p><span class='para-label'>C</span>Copenhagen has pursued an ambitious carbon neutrality goal, aiming to become the world's first carbon-neutral capital city. By 2023, 63 percent of Copenhagen's residents commuted by bicycle, enabled by 390 kilometres of dedicated cycling infrastructure. The city's district heating network, which supplies 98 percent of homes, captures waste heat from power generation. Copenhagen invested 2.8 billion Danish kroner — approximately 380 million euros — in climate adaptation measures between 2011 and 2025, following severe urban flooding in 2011 that caused 800 million euros in damages.</p>\n<p><span class='para-label'>D</span>Singapore's approach to green urbanism is distinctive in its integration of nature into the built environment at every scale. The city-state mandates that all new buildings replace the greenery they remove by incorporating rooftop gardens, sky terraces, or vertical green walls. Its Bishan-Ang Mo Kio Park, completed in 2012, transformed a concrete drainage canal into a naturalised river that manages stormwater while creating 62 hectares of public green space. Singapore has increased its total green cover from 36 percent in 1986 to 47 percent in 2021, despite significant population growth.</p>\n<p><span class='para-label'>E</span>Critics of green urbanism argue that its benefits are unevenly distributed, often serving higher-income residents while displacing lower-income communities through green gentrification. Studies in cities including Portland, New York, and Melbourne have found that the development of parks and green infrastructure correlates with rising property values and the displacement of lower-income residents. Achieving environmental and social equity simultaneously remains the central unresolved challenge of sustainable urban development.</p>",
      questions: [
        { num:14, type:"fill", question:"Green urbanism was pioneered by thinkers including Jan Gehl and Richard _______.", answer:"Rogers" },
        { num:15, type:"mc", question:"Curitiba's bus rapid transit system carries how many passengers per day?", options:["A. 1.3 million","B. 1.8 million","C. 2.3 million","D. 2.8 million"], answer:"C" },
        { num:16, type:"fill", question:"Curitiba has _______ square metres of green space per resident.", answer:"52" },
        { num:17, type:"mc", question:"What is the WHO minimum recommendation for green space per resident?", options:["A. 5 square metres","B. 9 square metres","C. 15 square metres","D. 20 square metres"], answer:"B" },
        { num:18, type:"fill", question:"In Curitiba, residents exchanged recyclables for fresh _______.", answer:"produce" },
        { num:19, type:"fill", question:"In 2023, _______ percent of Copenhagen residents commuted by bicycle.", answer:"63" },
        { num:20, type:"mc", question:"How much dedicated cycling infrastructure does Copenhagen have?", options:["A. 190 km","B. 290 km","C. 390 km","D. 490 km"], answer:"C" },
        { num:21, type:"fill", question:"Copenhagen's district heating network supplies _______ percent of homes.", answer:"98" },
        { num:22, type:"mc", question:"What caused Copenhagen to invest in climate adaptation from 2011?", options:["A. An earthquake","B. A drought","C. Urban flooding","D. A heatwave"], answer:"C" },
        { num:23, type:"fill", question:"Singapore's Bishan-Ang Mo Kio Park was completed in _______.", answer:"2012" },
        { num:24, type:"fill", question:"Singapore increased its green cover from 36 percent in 1986 to _______ percent in 2021.", answer:"47" },
        { num:25, type:"mc", question:"What is 'green gentrification' as described in paragraph E?", options:["A. Converting industrial land to parks","B. Green infrastructure correlating with displacement of lower-income residents","C. Planting trees in wealthy neighbourhoods","D. Building green roofs on luxury towers"], answer:"B" },
        { num:26, type:"fill", question:"Curitiba's recycling rates reached _______ percent by the 1990s.", answer:"70" }
      ]
    },
    {
      title: "Slums and Urban Informality",
      text: "<p><span class='para-label'>A</span>According to UN-Habitat, approximately one billion people — one in eight of the world's population — live in slums, defined as urban settlements lacking durable housing, sufficient living space, access to improved water, access to improved sanitation, or security of tenure. Slums are found on every continent, but are most concentrated in sub-Saharan Africa, South Asia, and Latin America. Dharavi in Mumbai, with a population estimated at between 600,000 and one million people in approximately 2.1 square kilometres, is among the most densely populated urban areas on Earth.</p>\n<p><span class='para-label'>B</span>Slums are not merely products of poverty — they are also products of exclusion. Urban land markets, zoning regulations, and building codes in most rapidly urbanising cities are structured in ways that make legal, affordable housing unattainable for the urban poor. As a result, migrants and low-income residents build informally on marginal land — riverbanks, steep slopes, flood plains, or land adjacent to industrial zones — that wealthier residents avoid. The urban poor pay disproportionately for basic services: water delivered by truck in informal settlements often costs 5 to 10 times more per litre than piped water available in formal neighbourhoods.</p>\n<p><span class='para-label'>C</span>Despite their challenges, informal settlements exhibit remarkable social organisation and economic vitality. Robert Neuwirth's research found that the informal economy in cities such as Nairobi and Lagos employs between 50 and 80 percent of the urban workforce. Dharavi alone generates an estimated one billion US dollars in annual economic output, primarily through small-scale manufacturing, recycling, and service industries. Community associations in informal settlements frequently provide services — security, waste collection, credit — that formal institutions fail to deliver.</p>\n<p><span class='para-label'>D</span>Policy responses have evolved significantly. Slum clearance — demolishing settlements and relocating residents — dominated policy in the 1950s and 1960s but proved largely counterproductive, dispersing communities and frequently leading to the re-formation of informal settlements elsewhere. From the 1970s onward, the World Bank and national governments began supporting in-situ upgrading: providing security of tenure, improving infrastructure, and extending services to existing settlements rather than demolishing them. Studies show that tenure security alone can catalyse significant self-investment by residents in improving their homes.</p>\n<p><span class='para-label'>E</span>The United Nations Sustainable Development Goal 11 commits signatory governments to providing access to safe and affordable housing for all by 2030 and to upgrading slums. Progress has been mixed. Between 2000 and 2020, the absolute number of slum dwellers increased from 792 million to over one billion, despite improvements in the proportion of urban populations living in slums in some regions. Closing the housing gap in rapidly urbanising countries requires not only finance and political will, but fundamentally different approaches to urban land management and planning.</p>",
      questions: [
        { num:27, type:"fill", question:"Approximately _______ billion people live in slums worldwide.", answer:"one" },
        { num:28, type:"mc", question:"Which of the following is NOT listed as a characteristic defining a slum?", options:["A. Lack of durable housing","B. Absence of schools","C. Lack of improved sanitation","D. Insecurity of tenure"], answer:"B" },
        { num:29, type:"fill", question:"Dharavi is located in _______.", answer:"Mumbai" },
        { num:30, type:"fill", question:"Water delivered by truck in informal settlements can cost _______ to ten times more per litre than piped water.", answer:"5" },
        { num:31, type:"mc", question:"What percentage of the urban workforce in cities like Nairobi and Lagos is employed in the informal economy?", options:["A. 20–40%","B. 30–60%","C. 50–80%","D. 60–90%"], answer:"C" },
        { num:32, type:"fill", question:"Dharavi generates an estimated _______ billion US dollars in annual economic output.", answer:"one" },
        { num:33, type:"mc", question:"Why did slum clearance policies in the 1950s and 1960s largely fail?", options:["A. They were too expensive","B. They dispersed communities and led to re-formation of settlements elsewhere","C. Residents refused to leave","D. Governments lacked legal authority"], answer:"B" },
        { num:34, type:"fill", question:"From the 1970s, the World Bank began supporting in-situ _______.", answer:"upgrading" },
        { num:35, type:"mc", question:"What does SDG 11 commit governments to achieving by 2030?", options:["A. Eliminating all informal settlements","B. Safe and affordable housing for all","C. Zero carbon cities","D. Universal public transport"], answer:"B" },
        { num:36, type:"fill", question:"The number of slum dwellers increased from 792 million in 2000 to over _______ billion by 2020.", answer:"one" },
        { num:37, type:"mc", question:"According to paragraph B, on what type of land do informal settlers typically build?", options:["A. Agricultural land near cities","B. Marginal land such as riverbanks and flood plains","C. Abandoned industrial estates","D. Government-owned parks"], answer:"B" },
        { num:38, type:"fill", question:"Dharavi covers approximately _______ square kilometres.", answer:"2.1" },
        { num:39, type:"fill", question:"Tenure security can catalyse significant self-_______ by residents.", answer:"investment" },
        { num:40, type:"mc", question:"In paragraph C, which sector is Dharavi's economy primarily described as?", options:["A. Tourism and hospitality","B. Finance and banking","C. Small-scale manufacturing, recycling, and services","D. Technology and software"], answer:"C" }
      ]
    }
  ]},
  writing: {
    task1: { chart: "A bar chart comparing urbanisation rates in 2000 vs 2023 across five regions: East Asia, South Asia, Sub-Saharan Africa, Europe, and Latin America.", prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt: "The rapid growth of cities is creating serious social and environmental problems. To what extent do you agree?" }
  },
  speaking: {
    part1: { questions: ["Do you live in a city or a smaller town? Do you prefer one to the other?","What do you like most about your neighbourhood?","How has your city or town changed in the last ten years?","What problems does your local area face?"] },
    part2: { topic: "Describe a building or place in your city that you particularly like.", points: ["What the place is","Where it is located","What it looks like or what makes it special","Why you like it"], followUp: "Do you think modern architecture fits well with historic buildings in cities?" },
    part3: { questions: ["How should cities balance the need for new housing with the preservation of green spaces?","What responsibilities do city governments have to their poorest residents?","Do you think people will continue to move to large cities in the future?","How can urban planning improve the quality of life for all residents, not just the wealthy?"] }
  }
},

// TEST 6 — Transportation
{
  id: 6, topic: "Transportation",
  listening: { sections: [
    {
      description: "A phone call to a rail information line about a train journey",
      transcript: "Operator: Good morning, National Rail enquiries, how can I help? Caller: Hi, I need to travel from Manchester Piccadilly to Edinburgh Waverley next Friday. Operator: Next Friday is the 22nd of March. The fastest service departs at 09:15 and arrives at 13:04 — that's 3 hours 49 minutes. There is also a 10:30 departure arriving at 14:52. Caller: What's the cost? Operator: An Advance single on the 09:15 is £43.50. A Flexible Open Return is £127.00. Caller: Do I need to book a seat? Operator: Seat reservations are mandatory on the 09:15 — it's a reserved-seat train. The 10:30 is an open service. Caller: Is there a dining car? Operator: Yes, the 09:15 has a standard buffet serving hot food and drinks. Caller: My name is Caroline Firth and my reference number from last time was RF882. Can you add this to a new booking? Operator: I can take your details. I'll also need a valid payment card. The booking fee is £1.50.",
      questions: [
        { num:1, type:"fill", question:"The caller wants to travel from Manchester Piccadilly to Edinburgh _______.", answer:"Waverley" },
        { num:2, type:"fill", question:"Next Friday is the _______ of March.", answer:"22nd" },
        { num:3, type:"fill", question:"The 09:15 service arrives at _______.", answer:"13:04" },
        { num:4, type:"fill", question:"The journey on the 09:15 takes 3 hours and _______ minutes.", answer:"49" },
        { num:5, type:"fill", question:"An Advance single on the 09:15 costs £_______.", answer:"43.50" },
        { num:6, type:"mc", question:"What type of ticket costs £127.00?", options:["A. Advance single","B. Off-peak return","C. Flexible Open Return","D. Season ticket"], answer:"C" },
        { num:7, type:"mc", question:"On which service are seat reservations mandatory?", options:["A. The 10:30","B. Both services","C. Neither service","D. The 09:15"], answer:"D" },
        { num:8, type:"fill", question:"The caller's previous reference number was _______.", answer:"RF882" },
        { num:9, type:"mc", question:"What food facilities are available on the 09:15?", options:["A. A full restaurant car","B. A standard buffet","C. Pre-ordered meals only","D. No food available"], answer:"B" },
        { num:10, type:"fill", question:"The booking fee is £_______.", answer:"1.50" }
      ]
    },
    {
      description: "A documentary about the global growth of electric vehicles",
      transcript: "Narrator: The electric vehicle revolution is reshaping the global automotive industry at unprecedented speed. In 2023, global electric vehicle sales reached 14 million units, representing 18 percent of all new car sales worldwide — up from just 4 percent in 2020. China dominates the market, accounting for 60 percent of global EV sales, with Europe second at 25 percent and the United States third at 10 percent. The most affordable EV on the Chinese market — the BYD Seagull — costs under 10,000 US dollars. Battery costs have fallen 97 percent since 1991, from over 1,000 dollars per kilowatt-hour to around 139 dollars in 2023. The International Energy Agency projects that EVs will account for 40 percent of new car sales globally by 2030. Norway leads in adoption rate — 88 percent of all new cars sold in Norway in 2023 were fully electric, driven by generous tax exemptions.",
      questions: [
        { num:11, type:"fill", question:"Global EV sales in 2023 reached _______ million units.", answer:"14" },
        { num:12, type:"fill", question:"EVs represented _______ percent of all new car sales in 2023.", answer:"18" },
        { num:13, type:"mc", question:"What percentage of new car sales were EVs in 2020?", options:["A. 2%","B. 4%","C. 6%","D. 8%"], answer:"B" },
        { num:14, type:"fill", question:"China accounts for _______ percent of global EV sales.", answer:"60" },
        { num:15, type:"fill", question:"The BYD Seagull costs under _______ US dollars.", answer:"10,000" },
        { num:16, type:"mc", question:"Battery costs have fallen by what percentage since 1991?", options:["A. 87%","B. 92%","C. 95%","D. 97%"], answer:"D" },
        { num:17, type:"fill", question:"Battery costs in 2023 were around _______ dollars per kilowatt-hour.", answer:"139" },
        { num:18, type:"mc", question:"By 2030, what share of new car sales does the IEA project will be EVs?", options:["A. 25%","B. 30%","C. 40%","D. 50%"], answer:"C" },
        { num:19, type:"fill", question:"In Norway, _______ percent of new cars sold in 2023 were fully electric.", answer:"88" },
        { num:20, type:"fill", question:"Norway's high adoption is driven by generous tax _______.", answer:"exemptions" }
      ]
    },
    {
      description: "Students and a tutor discussing a transport policy assignment",
      transcript: "Tutor: Your assignment is on urban transport policy. What have you chosen to compare? Aisha: We're comparing London and Amsterdam as contrasting models of urban mobility. London has 11 million daily public transport journeys and spent £12.4 billion on transport in 2022. Tutor: Good. Amsterdam? Raj: Amsterdam has about 900,000 bicycles for 900,000 residents — roughly one bike per person. Cycling accounts for 38 percent of all trips within the city. The city's cycling infrastructure covers 767 kilometres of dedicated lanes. Aisha: We also found that London's daily congestion charge zone generates about £180 million per year. Since its introduction in 2003 it reduced traffic in central London by 30 percent. Tutor: Excellent specifics. What conclusion are you reaching? Raj: That infrastructure investment, not just pricing, drives modal shift. We need at least eight academic sources. The assignment is 3,000 words and is due on March 28th.",
      questions: [
        { num:21, type:"fill", question:"London has _______ million daily public transport journeys.", answer:"11" },
        { num:22, type:"fill", question:"London spent £_______ billion on transport in 2022.", answer:"12.4" },
        { num:23, type:"fill", question:"Amsterdam has approximately _______ bicycles.", answer:"900,000" },
        { num:24, type:"fill", question:"Cycling accounts for _______ percent of all trips within Amsterdam.", answer:"38" },
        { num:25, type:"fill", question:"Amsterdam's cycling infrastructure covers _______ kilometres of dedicated lanes.", answer:"767" },
        { num:26, type:"mc", question:"How much does London's congestion charge zone generate per year?", options:["A. £80 million","B. £120 million","C. £180 million","D. £240 million"], answer:"C" },
        { num:27, type:"fill", question:"The London congestion charge was introduced in _______.", answer:"2003" },
        { num:28, type:"fill", question:"The congestion charge reduced central London traffic by _______ percent.", answer:"30" },
        { num:29, type:"mc", question:"What conclusion do the students reach about modal shift?", options:["A. Pricing alone is sufficient","B. Both pricing and infrastructure are needed","C. Infrastructure investment drives modal shift","D. Cultural change is the primary factor"], answer:"C" },
        { num:30, type:"fill", question:"The assignment is _______ words long.", answer:"3,000" }
      ]
    },
    {
      description: "A lecture on the history and future of high-speed rail",
      transcript: "Lecturer: High-speed rail is defined as rail services operating at speeds of 250 kilometres per hour or above. Japan's Shinkansen, launched in October 1964 to coincide with the Tokyo Olympics, was the world's first high-speed rail line. It initially connected Tokyo and Osaka — a distance of 515 kilometres — in 4 hours, compared to 7 hours previously. Today the network carries 420,000 passengers daily and has recorded zero fatal accidents in over 60 years of operation. China now has the world's longest high-speed rail network at 42,000 kilometres — more than the rest of the world combined. China built this in just 15 years, from 2008 to 2023. Europe's flagship project is the planned 27,000-kilometre Trans-European Transport Network, expected to be complete by 2050. Research shows that high-speed rail reduces short-haul air travel on competing routes by an average of 50 percent where journey times fall below 2.5 hours.",
      questions: [
        { num:31, type:"fill", question:"High-speed rail is defined as services operating at _______ km/h or above.", answer:"250" },
        { num:32, type:"fill", question:"Japan's Shinkansen was launched in October _______.", answer:"1964" },
        { num:33, type:"fill", question:"The Shinkansen initially connected Tokyo and Osaka, a distance of _______ kilometres.", answer:"515" },
        { num:34, type:"mc", question:"How long did the original Tokyo–Osaka journey take by Shinkansen?", options:["A. 2 hours","B. 3 hours","C. 4 hours","D. 5 hours"], answer:"C" },
        { num:35, type:"fill", question:"The Shinkansen carries _______ passengers daily.", answer:"420,000" },
        { num:36, type:"mc", question:"How many fatal accidents has the Shinkansen recorded in over 60 years?", options:["A. None","B. Two","C. Five","D. Twelve"], answer:"A" },
        { num:37, type:"fill", question:"China's high-speed rail network spans _______ kilometres.", answer:"42,000" },
        { num:38, type:"fill", question:"China built its network in just _______ years.", answer:"15" },
        { num:39, type:"mc", question:"By how much does high-speed rail reduce short-haul air travel on competing routes?", options:["A. 20%","B. 35%","C. 50%","D. 65%"], answer:"C" },
        { num:40, type:"fill", question:"Europe's Trans-European Transport Network is expected to be complete by _______.", answer:"2050" }
      ]
    }
  ]},
  reading: { passages: [
    {
      title: "The Autonomous Vehicle Revolution",
      text: "<p><span class='para-label'>A</span>Autonomous vehicles — also known as self-driving cars — are classified by the Society of Automotive Engineers on a scale from Level 0 (no automation) to Level 5 (full automation in all conditions). As of 2024, most commercially available systems operate at Level 2, meaning they can control steering, acceleration, and braking simultaneously but require constant driver supervision. True Level 4 autonomy — where the vehicle can complete entire journeys without human intervention in defined conditions — is commercially deployed only in limited geofenced areas, notably by Waymo in Phoenix and San Francisco, and by Baidu's Apollo Go robotaxi service in several Chinese cities.</p>\n<p><span class='para-label'>B</span>The potential safety benefits of full autonomy are substantial. Approximately 1.35 million people die in road traffic accidents each year globally, and the WHO estimates that 94 percent of serious crashes involve human error. Removing the human driver should, in theory, dramatically reduce this toll. However, a 2023 analysis by the Insurance Institute for Highway Safety found that current autonomous systems struggle with unusual road conditions, construction zones, and adverse weather, and that their safety record is not yet demonstrably superior to human drivers across all conditions.</p>\n<p><span class='para-label'>C</span>Economic disruption from widespread autonomous vehicle adoption is expected to be profound. The trucking industry alone employs approximately 3.5 million drivers in the United States — a profession particularly vulnerable to automation. McKinsey estimates that autonomous vehicles could create up to 800 billion US dollars in new annual value through efficiency gains, reduced accident costs, and new mobility services, but that this value will be concentrated among technology firms and fleet operators rather than distributed broadly across the workforce.</p>\n<p><span class='para-label'>D</span>Urban planning will need to adapt significantly. Current cities are designed around the assumption of human-driven vehicles, with vast areas devoted to parking — up to 30 percent of urban land in some American cities. Shared autonomous fleets would require far fewer parking spaces, potentially freeing enormous amounts of urban land for housing, parks, or other uses. However, critics warn that if autonomous vehicles are privately owned, their ease of use could encourage longer commutes and greater urban sprawl, worsening congestion rather than alleviating it.</p>\n<p><span class='para-label'>E</span>Regulatory frameworks lag behind technological development. No country has yet created a comprehensive national framework for fully autonomous vehicles on public roads. The European Union's proposed Regulation on Automated Vehicles, expected to be finalised in 2026, will be the first major supranational framework. Questions of liability — who is legally responsible when an autonomous vehicle causes an accident — remain largely unresolved, with courts in multiple countries having reached conflicting judgements. Cybersecurity is a further concern: in 2015, security researchers demonstrated that a connected vehicle could be remotely hijacked, leading to a recall of 1.4 million vehicles.</p>",
      questions: [
        { num:1, type:"fill", question:"The SAE classification scale runs from Level 0 to Level _______.", answer:"5" },
        { num:2, type:"mc", question:"At what SAE Level do most commercially available systems operate as of 2024?", options:["A. Level 1","B. Level 2","C. Level 3","D. Level 4"], answer:"B" },
        { num:3, type:"fill", question:"Waymo operates commercially in Phoenix and _______.", answer:"San Francisco" },
        { num:4, type:"fill", question:"Approximately _______ million people die in road traffic accidents each year.", answer:"1.35" },
        { num:5, type:"mc", question:"What percentage of serious crashes involve human error?", options:["A. 84%","B. 89%","C. 94%","D. 99%"], answer:"C" },
        { num:6, type:"fill", question:"The US trucking industry employs approximately _______ million drivers.", answer:"3.5" },
        { num:7, type:"mc", question:"How much annual value could autonomous vehicles create, according to McKinsey?", options:["A. $400 billion","B. $600 billion","C. $800 billion","D. $1 trillion"], answer:"C" },
        { num:8, type:"fill", question:"Up to _______ percent of urban land in some American cities is devoted to parking.", answer:"30" },
        { num:9, type:"mc", question:"What risk do critics highlight about privately owned autonomous vehicles?", options:["A. Higher accident rates","B. Longer commutes and greater urban sprawl","C. Reduced tax revenues","D. Loss of public transport funding"], answer:"B" },
        { num:10, type:"fill", question:"The EU's Regulation on Automated Vehicles is expected to be finalised in _______.", answer:"2026" },
        { num:11, type:"fill", question:"In 2015, researchers demonstrated a connected vehicle could be remotely _______.", answer:"hijacked" },
        { num:12, type:"mc", question:"The 2015 hacking demonstration led to the recall of how many vehicles?", options:["A. 400,000","B. 800,000","C. 1.2 million","D. 1.4 million"], answer:"D" },
        { num:13, type:"mc", question:"According to paragraph C, where will the economic value from autonomous vehicles be concentrated?", options:["A. Distributed broadly across the workforce","B. In government tax revenues","C. Among technology firms and fleet operators","D. In reduced consumer prices"], answer:"C" }
      ]
    },
    {
      title: "Aviation and the Climate Crisis",
      text: "<p><span class='para-label'>A</span>Commercial aviation accounts for approximately 2.5 percent of global CO2 emissions. However, when the full climate impact of aviation is considered — including the warming effects of contrails, water vapour, and nitrogen oxides emitted at altitude — its contribution to global warming is estimated to be two to four times greater than its CO2 emissions alone suggest. The aviation industry transported 4.5 billion passengers in 2019, a figure that dropped to 1.8 billion in 2020 due to the COVID-19 pandemic before recovering to 4.3 billion in 2023. The International Air Transport Association (IATA) projects that passenger numbers will double to 8 billion by 2040.</p>\n<p><span class='para-label'>B</span>Reducing aviation's climate impact presents particular technical challenges. Unlike road transport, aviation cannot easily be electrified with current battery technology — the energy density of lithium-ion batteries is approximately 40 times lower than that of jet fuel. Sustainable aviation fuel (SAF), produced from waste biomass, agricultural residues, or through power-to-liquid processes, can reduce lifecycle CO2 emissions by up to 80 percent compared to conventional jet fuel. However, SAF currently represents less than 1 percent of total aviation fuel consumption and costs three to five times more than conventional fuel.</p>\n<p><span class='para-label'>C</span>Hydrogen-powered aviation is being actively researched. Airbus has announced plans to bring a commercial hydrogen aircraft to market by 2035, initially targeting short- to medium-haul routes of up to 2,000 kilometres. Hydrogen produces no CO2 when burned, though it does produce water vapour, which may have some warming effect at altitude. The infrastructure challenge of producing, transporting, and storing liquid hydrogen at airports is enormous — liquid hydrogen must be stored at minus 253 degrees Celsius.</p>\n<p><span class='para-label'>D</span>Demand management — reducing the number of flights — is the most immediately effective measure available. Several European countries have introduced or are considering flight bans on routes where fast rail alternatives exist. France banned domestic flights in 2023 on routes where the equivalent train journey takes under 2.5 hours. The Netherlands, Austria, and Belgium have implemented or proposed similar restrictions. Critics argue these measures have limited impact, as short domestic routes represent a small fraction of total aviation emissions.</p>\n<p><span class='para-label'>E</span>The IATA has committed the global airline industry to achieving net zero carbon emissions by 2050. The strategy relies primarily on sustainable aviation fuel (65 percent of projected reductions), new aircraft technology (13 percent), operational efficiency (3 percent), and carbon offsets (19 percent). Environmental groups have challenged the strategy, arguing it relies too heavily on unproven technologies and carbon offsets rather than actual emissions reductions, and that the 2050 target is inconsistent with limiting global warming to 1.5 degrees Celsius.</p>",
      questions: [
        { num:14, type:"fill", question:"Aviation accounts for approximately _______ percent of global CO2 emissions.", answer:"2.5" },
        { num:15, type:"mc", question:"How many passengers did aviation transport in 2019?", options:["A. 3.5 billion","B. 4.0 billion","C. 4.5 billion","D. 5.0 billion"], answer:"C" },
        { num:16, type:"fill", question:"Passenger numbers dropped to _______ billion in 2020 due to COVID-19.", answer:"1.8" },
        { num:17, type:"mc", question:"By 2040, IATA projects passenger numbers will reach:", options:["A. 6 billion","B. 7 billion","C. 8 billion","D. 9 billion"], answer:"C" },
        { num:18, type:"fill", question:"SAF can reduce lifecycle CO2 emissions by up to _______ percent.", answer:"80" },
        { num:19, type:"mc", question:"What fraction of aviation fuel is currently SAF?", options:["A. Less than 1%","B. About 3%","C. About 5%","D. About 10%"], answer:"A" },
        { num:20, type:"fill", question:"Airbus aims to bring a commercial hydrogen aircraft to market by _______.", answer:"2035" },
        { num:21, type:"fill", question:"Liquid hydrogen must be stored at minus _______ degrees Celsius.", answer:"253" },
        { num:22, type:"mc", question:"France banned domestic flights in 2023 on routes where train journeys take under:", options:["A. 1.5 hours","B. 2.0 hours","C. 2.5 hours","D. 3.0 hours"], answer:"C" },
        { num:23, type:"fill", question:"The IATA committed the airline industry to net zero carbon emissions by _______.", answer:"2050" },
        { num:24, type:"mc", question:"According to the IATA strategy, what will contribute the largest share of emissions reductions?", options:["A. New aircraft technology","B. Carbon offsets","C. Sustainable aviation fuel","D. Operational efficiency"], answer:"C" },
        { num:25, type:"fill", question:"Carbon offsets account for _______ percent of projected reductions under the IATA strategy.", answer:"19" },
        { num:26, type:"mc", question:"What is the energy density of lithium-ion batteries compared to jet fuel?", options:["A. 10 times lower","B. 20 times lower","C. 30 times lower","D. 40 times lower"], answer:"D" }
      ]
    },
    {
      title: "Cycling as Urban Transport",
      text: "<p><span class='para-label'>A</span>The bicycle is the world's most widely used form of transport, with an estimated 1.5 billion bicycles in circulation globally — roughly twice the number of motor vehicles. In many low-income countries, the bicycle is a critical economic tool, enabling workers, traders, and healthcare workers to travel distances impossible on foot. In high-income cities, cycling has experienced a resurgence driven by congestion, environmental concern, and public health imperatives. The COVID-19 pandemic accelerated this trend sharply: cycling rates in many European cities increased by 30 to 50 percent in 2020 as commuters avoided crowded public transport.</p>\n<p><span class='para-label'>B</span>The health benefits of regular cycling are well-documented. A large-scale 2017 UK study involving 263,000 participants found that commuting by bicycle was associated with a 45 percent lower risk of cancer and a 46 percent lower risk of cardiovascular disease compared to non-active commuting. Regular cyclists live, on average, two years longer than non-cyclists. The economic value of these health benefits has been calculated at approximately 0.64 euros per kilometre cycled — a figure used by governments to justify cycling infrastructure investment.</p>\n<p><span class='para-label'>C</span>The Netherlands is the global leader in cycling infrastructure and culture. The Dutch cycle approximately 15 billion kilometres per year — about 900 kilometres per person annually. The Netherlands has 35,000 kilometres of dedicated cycling paths. Cycling accounts for 27 percent of all trips nationally and over 50 percent in cities such as Groningen and Leiden. The country's investment in cycling infrastructure averages 30 euros per person per year — modest in absolute terms but reflecting decades of consistent political commitment.</p>\n<p><span class='para-label'>D</span>The e-bike — an electrically assisted bicycle — is transforming cycling accessibility. Global e-bike sales reached 40 million units in 2023, compared to 10 million conventional bicycles sold in the same period in high-income markets. E-bikes extend the practical range of cycling, enable older and less physically fit riders to cycle, and make hilly terrain more accessible. Studies from Switzerland and the Netherlands show that e-bike adoption increases average trip distances from 3 kilometres to 9 kilometres, bringing destinations previously accessible only by car within cycling range.</p>\n<p><span class='para-label'>E</span>Despite its benefits, cycling faces significant barriers in many cities. The most powerful deterrent to cycling is perceived danger from motor traffic. Studies across multiple countries consistently show that perceived safety — not actual distance or topography — is the primary factor in cycling modal share. A 2019 systematic review found that well-designed protected cycling infrastructure reduces cycling injuries by 75 to 90 percent compared to on-road cycling. This evidence underpins the growing consensus among transport planners that investing in physically separated cycling infrastructure is the most effective means of increasing cycling uptake.</p>",
      questions: [
        { num:27, type:"fill", question:"There are an estimated _______ billion bicycles in circulation globally.", answer:"1.5" },
        { num:28, type:"mc", question:"By how much did cycling rates increase in many European cities in 2020?", options:["A. 10–20%","B. 20–30%","C. 30–50%","D. 50–70%"], answer:"C" },
        { num:29, type:"fill", question:"The 2017 UK cycling study involved _______ participants.", answer:"263,000" },
        { num:30, type:"fill", question:"Cycling commuters had a _______ percent lower risk of cardiovascular disease.", answer:"46" },
        { num:31, type:"mc", question:"What is the estimated economic value of health benefits per kilometre cycled?", options:["A. 0.34 euros","B. 0.64 euros","C. 0.94 euros","D. 1.24 euros"], answer:"B" },
        { num:32, type:"fill", question:"The Netherlands has _______ kilometres of dedicated cycling paths.", answer:"35,000" },
        { num:33, type:"fill", question:"The Netherlands invests _______ euros per person per year in cycling infrastructure.", answer:"30" },
        { num:34, type:"mc", question:"In which Dutch cities does cycling account for over 50 percent of all trips?", options:["A. Amsterdam and Rotterdam","B. Groningen and Leiden","C. Utrecht and The Hague","D. Eindhoven and Tilburg"], answer:"B" },
        { num:35, type:"fill", question:"Global e-bike sales reached _______ million units in 2023.", answer:"40" },
        { num:36, type:"mc", question:"What do e-bikes increase average trip distances from and to?", options:["A. From 2 km to 6 km","B. From 3 km to 9 km","C. From 4 km to 12 km","D. From 5 km to 15 km"], answer:"B" },
        { num:37, type:"fill", question:"The primary deterrent to cycling is perceived _______ from motor traffic.", answer:"danger" },
        { num:38, type:"mc", question:"By how much does protected cycling infrastructure reduce cycling injuries?", options:["A. 25–40%","B. 50–65%","C. 75–90%","D. 90–100%"], answer:"C" },
        { num:39, type:"fill", question:"Regular cyclists live on average _______ years longer than non-cyclists.", answer:"two" },
        { num:40, type:"mc", question:"According to paragraph C, how many kilometres does the average Dutch person cycle per year?", options:["A. 600 km","B. 750 km","C. 900 km","D. 1,100 km"], answer:"C" }
      ]
    }
  ]},
  writing: {
    task1: { chart: "A diagram showing the rise in electric vehicle sales (units) from 2018 to 2023 across China, Europe, and the USA.", prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt: "Public transport should be made free to encourage people to abandon private vehicles. To what extent do you agree or disagree?" }
  },
  speaking: {
    part1: { questions: ["How do you usually travel to work or school?","What form of transport do you find most convenient in your city?","Has transport in your area improved or worsened in recent years?","Do you enjoy long-distance travel? Why or why not?"] },
    part2: { topic: "Describe a memorable journey or trip you have taken.", points: ["Where you went","How you travelled","Who you were with","Why it was memorable"], followUp: "How do you think travel will be different in fifty years' time?" },
    part3: { questions: ["Should governments invest more in public transport or road infrastructure?","How can cities reduce their dependence on private cars?","What are the main barriers to people using public transport more?","Do you think driverless vehicles will transform cities within your lifetime?"] }
  }
},

// TEST 7 — Economics & Trade
{
  id: 7, topic: "Economics & Trade",
  listening: { sections: [
    {
      description: "A phone call arranging a business meeting about import procedures",
      transcript: "PA: Good afternoon, Meridian Trading, Clara Hoskins speaking. Caller: Hello, this is Yoshida from Tanaka Exports. I'd like to arrange a meeting with your trade compliance team regarding our new import application. PA: Of course. Would Thursday the 4th of April work for you? Caller: Yes. What time? PA: We could do 10am or 2pm. Caller: 2pm would be better. PA: Perfect. The meeting will be in Conference Room B on the third floor. You'll need to bring your company registration certificate, your VAT number — which should be a nine-digit number — and proof of your last three shipments. Caller: Our VAT number is 483 291 750. PA: Thank you. The meeting should last about 90 minutes. Our compliance officer is Marcus Webb. He'll send a pre-meeting document pack by Wednesday. Shall I take a contact email? Caller: It's y.tanaka@tanakaexports.co.jp. PA: Noted. Parking is free in Bay 12 on the south side of the building.",
      questions: [
        { num:1, type:"fill", question:"The caller's name is _______ from Tanaka Exports.", answer:"Yoshida" },
        { num:2, type:"fill", question:"The meeting is arranged for Thursday the _______ of April.", answer:"4th" },
        { num:3, type:"fill", question:"The meeting will take place at _______ pm.", answer:"2" },
        { num:4, type:"fill", question:"The meeting room is Conference Room _______ on the third floor.", answer:"B" },
        { num:5, type:"mc", question:"What is described as a nine-digit number?", options:["A. Company registration number","B. VAT number","C. Shipment reference","D. Account number"], answer:"B" },
        { num:6, type:"fill", question:"The caller's VAT number is _______.", answer:"483 291 750" },
        { num:7, type:"fill", question:"The meeting should last about _______ minutes.", answer:"90" },
        { num:8, type:"fill", question:"The compliance officer's name is Marcus _______.", answer:"Webb" },
        { num:9, type:"mc", question:"When will the pre-meeting document pack be sent?", options:["A. Monday","B. Tuesday","C. Wednesday","D. Friday"], answer:"C" },
        { num:10, type:"mc", question:"Where is free parking available?", options:["A. Bay 6 on the north side","B. Bay 12 on the south side","C. Bay 8 on the east side","D. Street parking outside"], answer:"B" }
      ]
    },
    {
      description: "A radio economics broadcast about global trade patterns",
      transcript: "Presenter: Global merchandise trade reached a record 25 trillion US dollars in 2022, according to the World Trade Organisation. China is the world's largest goods exporter, accounting for 14.4 percent of global exports. The United States is the largest importer, absorbing 13.2 percent of global imports. The WTO has found that trade openness raises living standards — on average, a 10 percent increase in trade openness raises per capita income by 3 to 5 percent. However, trade's benefits are unevenly distributed. Manufacturing employment in the United States declined by 5 million jobs between 2000 and 2010, a period coinciding with China's WTO accession in 2001. Economists Autor, Dorn, and Hanson estimated that the 'China shock' directly displaced 2.4 million American jobs. The trade deficit of the United States reached 1.06 trillion dollars in 2022 — the largest in history. Meanwhile, Germany ran the world's largest trade surplus at 86 billion euros.",
      questions: [
        { num:11, type:"fill", question:"Global merchandise trade reached _______ trillion US dollars in 2022.", answer:"25" },
        { num:12, type:"fill", question:"China accounts for _______ percent of global exports.", answer:"14.4" },
        { num:13, type:"fill", question:"The US is the largest importer, absorbing _______ percent of global imports.", answer:"13.2" },
        { num:14, type:"mc", question:"A 10 percent increase in trade openness raises per capita income by how much?", options:["A. 1–2%","B. 3–5%","C. 5–7%","D. 7–10%"], answer:"B" },
        { num:15, type:"fill", question:"US manufacturing employment declined by _______ million jobs between 2000 and 2010.", answer:"5" },
        { num:16, type:"fill", question:"China joined the WTO in _______.", answer:"2001" },
        { num:17, type:"fill", question:"The 'China shock' directly displaced _______ million American jobs.", answer:"2.4" },
        { num:18, type:"mc", question:"What was the US trade deficit in 2022?", options:["A. $0.76 trillion","B. $0.86 trillion","C. $0.96 trillion","D. $1.06 trillion"], answer:"D" },
        { num:19, type:"fill", question:"Germany ran a trade surplus of _______ billion euros.", answer:"86" },
        { num:20, type:"mc", question:"Which organisation found that trade openness raises living standards?", options:["A. IMF","B. World Bank","C. WTO","D. OECD"], answer:"C" }
      ]
    },
    {
      description: "Students and a lecturer discussing a macroeconomics case study on inflation",
      transcript: "Dr Osei: Let's look at the 2022 inflation surge. What were the headline figures? Maya: In the UK, CPI inflation peaked at 11.1 percent in October 2022 — the highest level since 1981. In the eurozone, it reached 10.6 percent in October 2022. Dr Osei: And the US? Leo: US CPI peaked at 9.1 percent in June 2022 — a 40-year high. The Federal Reserve raised interest rates 11 times between March 2022 and July 2023, from near zero to a range of 5.25 to 5.5 percent. Dr Osei: What were the causes? Maya: A supply chain crisis following COVID-19, then the energy price shock from Russia's invasion of Ukraine in February 2022. Gas prices in Europe rose 400 percent in 2022. Leo: Food prices also rose sharply — the UN Food and Agriculture Organisation's food price index rose 14.3 percent in 2022. Dr Osei: Good. Remember — your economics presentations are on May 10th, ten minutes each.",
      questions: [
        { num:21, type:"fill", question:"UK CPI inflation peaked at _______ percent in October 2022.", answer:"11.1" },
        { num:22, type:"fill", question:"This was the highest UK inflation since _______.", answer:"1981" },
        { num:23, type:"fill", question:"Eurozone inflation peaked at _______ percent in October 2022.", answer:"10.6" },
        { num:24, type:"fill", question:"US CPI peaked at _______ percent in June 2022.", answer:"9.1" },
        { num:25, type:"mc", question:"How many times did the Federal Reserve raise interest rates between March 2022 and July 2023?", options:["A. 7","B. 9","C. 11","D. 13"], answer:"C" },
        { num:26, type:"fill", question:"The Fed raised rates to a range of 5.25 to _______ percent.", answer:"5.5" },
        { num:27, type:"mc", question:"When did Russia invade Ukraine?", options:["A. January 2022","B. February 2022","C. March 2022","D. April 2022"], answer:"B" },
        { num:28, type:"fill", question:"European gas prices rose _______ percent in 2022.", answer:"400" },
        { num:29, type:"fill", question:"The UN FAO food price index rose _______ percent in 2022.", answer:"14.3" },
        { num:30, type:"fill", question:"Economics presentations are on May _______, ten minutes each.", answer:"10th" }
      ]
    },
    {
      description: "A lecture on the history and theory of free trade",
      transcript: "Lecturer: The theoretical case for free trade was established by David Ricardo in 1817 through the principle of comparative advantage. Ricardo showed that even if one country is more efficient at producing everything, both countries benefit from specialisation and trade. Britain championed free trade in the nineteenth century, repealing the Corn Laws in 1846, which reduced the price of bread and raised real wages. The twentieth century saw the establishment of multilateral trade institutions — the General Agreement on Tariffs and Trade in 1947, which became the World Trade Organisation in 1995. The WTO currently has 164 member states. Average global tariff rates have fallen from over 20 percent in 1947 to under 3 percent today. However, trade economists recognise that while free trade increases aggregate welfare, it creates winners and losers within countries, which is why political resistance — protectionism — periodically resurges. The US imposed tariffs of up to 25 percent on Chinese goods in 2018, in what became known as the US–China trade war.",
      questions: [
        { num:31, type:"fill", question:"The principle of comparative advantage was established by David Ricardo in _______.", answer:"1817" },
        { num:32, type:"fill", question:"Britain repealed the Corn Laws in _______.", answer:"1846" },
        { num:33, type:"fill", question:"The GATT was established in _______.", answer:"1947" },
        { num:34, type:"fill", question:"The GATT became the World Trade Organisation in _______.", answer:"1995" },
        { num:35, type:"fill", question:"The WTO currently has _______ member states.", answer:"164" },
        { num:36, type:"mc", question:"What were average global tariff rates in 1947?", options:["A. Over 10%","B. Over 15%","C. Over 20%","D. Over 25%"], answer:"C" },
        { num:37, type:"fill", question:"Average global tariff rates today are under _______ percent.", answer:"3" },
        { num:38, type:"mc", question:"What is the term for political resistance to free trade?", options:["A. Mercantilism","B. Protectionism","C. Nationalism","D. Isolationism"], answer:"B" },
        { num:39, type:"fill", question:"The US imposed tariffs of up to _______ percent on Chinese goods in 2018.", answer:"25" },
        { num:40, type:"mc", question:"What effect did repealing the Corn Laws have?", options:["A. Raised food prices","B. Reduced real wages","C. Reduced bread prices and raised real wages","D. Increased agricultural employment"], answer:"C" }
      ]
    }
  ]},
  reading: { passages: [
    {
      title: "The Rise and Risks of Global Supply Chains",
      text: "<p><span class='para-label'>A</span>The modern global supply chain emerged from a confluence of forces in the latter decades of the twentieth century: trade liberalisation under the GATT and WTO, containerisation of shipping, advances in telecommunications, and the opening of China and Eastern Europe to global manufacturing. The result was a dramatic fragmentation of production — the various components of a single product might now be designed in one country, manufactured across several others, and assembled in a fourth. Apple's iPhone, for example, sources components from suppliers in 43 countries before being assembled in China and sold worldwide.</p>\n<p><span class='para-label'>B</span>The efficiency gains from global supply chains are substantial. The cost of a container shipment fell by 90 percent between 1950 and 2000. Global trade as a share of GDP rose from 25 percent in 1970 to 58 percent by 2008. Manufacturing costs in China in 2000 were approximately one-tenth of those in the United States, enabling dramatic reductions in the prices of manufactured goods. The Boston Consulting Group estimated that global supply chains reduced the average price of manufactured goods by 15 percent over the period 2000 to 2020.</p>\n<p><span class='para-label'>C</span>However, the COVID-19 pandemic exposed the fragility of highly optimised global supply chains. The 'just-in-time' production model, which minimises inventory to reduce costs, left manufacturers with almost no buffer when supply disruptions occurred. Semiconductor shortages — triggered by a combination of pandemic demand surges in consumer electronics and production shutdowns — cost the global automotive industry an estimated 210 billion dollars in lost revenue in 2021 alone. Global shipping costs increased sixfold between 2020 and 2021, straining businesses across multiple sectors.</p>\n<p><span class='para-label'>D</span>Geopolitical tensions have added a further dimension of risk to global supply chains. The United States and European Union have both pursued policies of 'friend-shoring' — concentrating supply chains among politically aligned nations — and 'reshoring' critical industries. The US CHIPS and Science Act of 2022 allocated 52 billion dollars to domestic semiconductor manufacturing. The EU Critical Raw Materials Act of 2023 set targets for processing 40 percent of strategic minerals domestically. China's dominance in rare earth processing — controlling 85 percent of global capacity — is viewed as a strategic vulnerability by Western governments.</p>\n<p><span class='para-label'>E</span>Sustainability concerns are driving further reconfiguration of supply chains. The EU's Carbon Border Adjustment Mechanism (CBAM), which came into force in 2023, imposes carbon costs on imports from countries without equivalent carbon pricing. Supply chain transparency legislation — including the EU's Corporate Sustainability Due Diligence Directive — requires large companies to identify and address human rights and environmental risks throughout their supply chains. These regulatory developments are increasing the cost and complexity of global sourcing but may redirect trade flows in ways that reduce environmental harm.</p>",
      questions: [
        { num:1, type:"fill", question:"Apple's iPhone sources components from suppliers in _______ countries.", answer:"43" },
        { num:2, type:"mc", question:"By how much did container shipping costs fall between 1950 and 2000?", options:["A. 70%","B. 80%","C. 90%","D. 95%"], answer:"C" },
        { num:3, type:"fill", question:"Global trade as a share of GDP rose from 25 percent in 1970 to _______ percent by 2008.", answer:"58" },
        { num:4, type:"fill", question:"The Boston Consulting Group estimated supply chains reduced manufactured goods prices by _______ percent.", answer:"15" },
        { num:5, type:"mc", question:"What production model left manufacturers without buffer during COVID-19?", options:["A. Just-in-case","B. Just-in-time","C. Lean manufacturing","D. Agile production"], answer:"B" },
        { num:6, type:"fill", question:"Semiconductor shortages cost the global automotive industry _______ billion dollars in 2021.", answer:"210" },
        { num:7, type:"mc", question:"By how much did global shipping costs increase between 2020 and 2021?", options:["A. Threefold","B. Fourfold","C. Fivefold","D. Sixfold"], answer:"D" },
        { num:8, type:"fill", question:"The US CHIPS and Science Act allocated _______ billion dollars to domestic semiconductor manufacturing.", answer:"52" },
        { num:9, type:"fill", question:"China controls _______ percent of global rare earth processing capacity.", answer:"85" },
        { num:10, type:"mc", question:"What does 'friend-shoring' mean?", options:["A. Moving production back to the home country","B. Concentrating supply chains among politically aligned nations","C. Reducing the number of supply chain partners","D. Digitising supply chain management"], answer:"B" },
        { num:11, type:"fill", question:"The EU's Carbon Border Adjustment Mechanism came into force in _______.", answer:"2023" },
        { num:12, type:"mc", question:"What does the EU's Corporate Sustainability Due Diligence Directive require?", options:["A. Carbon reporting only","B. Identifying human rights and environmental risks in supply chains","C. Annual audits of financial accounts","D. Disclosure of executive pay"], answer:"B" },
        { num:13, type:"fill", question:"Manufacturing costs in China in 2000 were approximately one-_______ of those in the United States.", answer:"tenth" }
      ]
    },
    {
      title: "Inequality and Economic Growth",
      text: "<p><span class='para-label'>A</span>Economic growth has lifted hundreds of millions of people out of poverty. The proportion of the global population living in extreme poverty — defined as subsisting on under 2.15 US dollars per day — fell from 38 percent in 1990 to 9 percent in 2019, according to World Bank data. China's economic transformation has been most dramatic: between 1990 and 2015, China lifted approximately 800 million people out of extreme poverty, accounting for the vast majority of global poverty reduction in this period. However, growth has coincided with rising inequality both between and within nations.</p>\n<p><span class='para-label'>B</span>The Gini coefficient is the standard measure of income inequality, ranging from 0 (perfect equality) to 1 (perfect inequality). Among high-income countries, the United States has one of the highest Gini coefficients at 0.39, while the Nordic countries cluster around 0.27 to 0.30. South Africa has one of the world's highest Gini coefficients at 0.63. Globally, the richest 10 percent of the world's population owns 76 percent of all wealth, according to the 2022 World Inequality Report. The richest 1 percent captured 54 percent of all new wealth created between 2020 and 2022.</p>\n<p><span class='para-label'>C</span>The relationship between inequality and economic growth is contested. The 'trickle-down' hypothesis holds that wealth created at the top eventually benefits everyone through investment, job creation, and taxation. Critics argue the evidence for this is weak: a 2015 IMF study found that a 1 percentage point increase in the income share of the top 20 percent is associated with lower GDP growth, while a similar increase in the share of the bottom 20 percent is associated with higher growth. This suggests that extreme inequality may actually impede economic performance.</p>\n<p><span class='para-label'>D</span>Structural factors drive inequality. Returns to capital — profits, dividends, rents — consistently outpace returns to labour — wages — in most economies. Thomas Piketty's seminal work 'Capital in the Twenty-First Century', published in 2013, documented that the rate of return on capital (r) tends to exceed the rate of economic growth (g) over the long term, mechanically increasing the share of income going to owners of capital. Technological change has also displaced middle-skill routine jobs — a process economists call 'job polarisation' — concentrating employment growth at the high-skill, high-wage and low-skill, low-wage ends of the labour market.</p>\n<p><span class='para-label'>E</span>Policy responses to inequality include progressive income and wealth taxation, expansion of publicly funded education and healthcare, minimum wage legislation, and strengthening of worker bargaining rights. Oxfam has called for a global minimum wealth tax of 2 percent on assets above 1 billion US dollars, which it estimates would raise 250 billion US dollars annually. Proponents of universal basic income (UBI) argue that unconditional cash transfers can address both poverty and the disruption caused by automation, though evidence from large-scale trials remains mixed.</p>",
      questions: [
        { num:14, type:"fill", question:"The proportion living in extreme poverty fell from 38 percent in 1990 to _______ percent in 2019.", answer:"9" },
        { num:15, type:"fill", question:"China lifted approximately _______ million people out of extreme poverty between 1990 and 2015.", answer:"800" },
        { num:16, type:"mc", question:"What is the Gini coefficient scale?", options:["A. 0 to 10","B. 0 to 100","C. 0 to 1","D. 1 to 10"], answer:"C" },
        { num:17, type:"fill", question:"The United States has a Gini coefficient of _______.", answer:"0.39" },
        { num:18, type:"fill", question:"South Africa has a Gini coefficient of _______.", answer:"0.63" },
        { num:19, type:"mc", question:"What percentage of all wealth does the richest 10 percent own?", options:["A. 56%","B. 66%","C. 76%","D. 86%"], answer:"C" },
        { num:20, type:"fill", question:"The richest 1 percent captured _______ percent of all new wealth created between 2020 and 2022.", answer:"54" },
        { num:21, type:"mc", question:"What did the 2015 IMF study find about the income share of the top 20 percent?", options:["A. It is associated with higher GDP growth","B. It is associated with lower GDP growth","C. It has no effect on GDP growth","D. It reduces unemployment"], answer:"B" },
        { num:22, type:"fill", question:"Piketty's major work was published in _______.", answer:"2013" },
        { num:23, type:"fill", question:"Piketty argues that the rate of return on capital (r) tends to exceed the rate of economic _______.", answer:"growth" },
        { num:24, type:"mc", question:"What does 'job polarisation' describe?", options:["A. Rising wages across all sectors","B. Concentration of jobs at high-skill and low-skill extremes","C. Automation of all manual labour","D. Migration of jobs to developing countries"], answer:"B" },
        { num:25, type:"fill", question:"Oxfam calls for a global minimum wealth tax of _______ percent on assets above $1 billion.", answer:"2" },
        { num:26, type:"mc", question:"What does UBI stand for?", options:["A. Universal Business Investment","B. United Banking Initiative","C. Universal Basic Income","D. Urban Benefits Index"], answer:"C" }
      ]
    },
    {
      title: "The Economics of Climate Change",
      text: "<p><span class='para-label'>A</span>The economics of climate change involves estimating the costs of both unmitigated warming and the measures needed to prevent it. The most influential early analysis — the Stern Review on the Economics of Climate Change, published by Nicholas Stern in 2006 — estimated that unmitigated climate change could reduce global GDP by 5 to 20 percent permanently, while the cost of action to prevent dangerous warming would be approximately 1 percent of annual global GDP. Stern famously described climate change as 'the greatest market failure the world has ever seen' — an externality of unprecedented scale.</p>\n<p><span class='para-label'>B</span>The social cost of carbon (SCC) is the economic value of the harm caused by emitting one additional tonne of CO2 into the atmosphere. The US government's Interagency Working Group estimated the SCC at 190 dollars per tonne in 2022, while some economists argue the true figure, accounting for tail risks and discount rate uncertainties, could exceed 1,000 dollars per tonne. Accurately estimating the SCC requires assumptions about discount rates — the rate at which future damages are valued relative to present costs — that are deeply contested on both technical and ethical grounds.</p>\n<p><span class='para-label'>C</span>The transition to a low-carbon economy offers significant economic opportunities alongside its costs. The International Renewable Energy Agency (IRENA) estimates that tripling renewable energy capacity by 2030 and doubling energy efficiency would require cumulative investment of 35 trillion US dollars but would generate economic benefits of 98 trillion US dollars by 2050 — a ratio of almost three to one. The clean energy transition is already creating employment: renewable energy employed 12.7 million people globally in 2023, up from 7.3 million in 2012.</p>\n<p><span class='para-label'>D</span>Climate change imposes severe costs on vulnerable countries that have contributed least to the problem. Small island developing states face existential threats from sea level rise — the Maldives, with an average elevation of just 1.5 metres, is particularly at risk. The UN estimated in 2022 that developing countries face adaptation costs of between 160 and 340 billion US dollars annually by 2030. The Warsaw International Mechanism for Loss and Damage, established in 2013, and the new Loss and Damage Fund agreed at COP27 in 2022, represent attempts to address this equity dimension.</p>\n<p><span class='para-label'>E</span>Economists broadly agree that carbon pricing is the most cost-efficient instrument for reducing emissions. When production and consumption decisions reflect the true cost of carbon, the market mechanism directs resources toward lower-carbon alternatives. However, carbon prices remain far too low in most of the world: the IMF estimates that an effective global carbon price of 75 dollars per tonne is needed by 2030 to meet Paris Agreement targets, yet the global average effective carbon price was just 5 dollars per tonne in 2023. The gap between the economically optimal carbon price and current policy represents one of the largest failures of global economic governance.</p>",
      questions: [
        { num:27, type:"fill", question:"The Stern Review was published by Nicholas Stern in _______.", answer:"2006" },
        { num:28, type:"fill", question:"Stern estimated the cost of action at approximately _______ percent of annual global GDP.", answer:"1" },
        { num:29, type:"mc", question:"How did Stern describe climate change?", options:["A. The greatest scientific failure","B. The greatest market failure","C. The greatest political failure","D. The greatest moral failure"], answer:"B" },
        { num:30, type:"fill", question:"The US government estimated the social cost of carbon at _______ dollars per tonne in 2022.", answer:"190" },
        { num:31, type:"mc", question:"What does SCC stand for?", options:["A. Sustainable Carbon Credits","B. Social Cost of Carbon","C. Standard Climate Calculation","D. Sectoral Carbon Cap"], answer:"B" },
        { num:32, type:"fill", question:"IRENA estimates tripling renewables by 2030 would generate economic benefits of _______ trillion US dollars by 2050.", answer:"98" },
        { num:33, type:"fill", question:"Renewable energy employed _______ million people globally in 2023.", answer:"12.7" },
        { num:34, type:"mc", question:"What is the average elevation of the Maldives?", options:["A. 0.5 metres","B. 1.0 metre","C. 1.5 metres","D. 2.0 metres"], answer:"C" },
        { num:35, type:"fill", question:"The UN estimated developing countries face adaptation costs of up to _______ billion US dollars annually by 2030.", answer:"340" },
        { num:36, type:"fill", question:"The Loss and Damage Fund was agreed at COP _______ in 2022.", answer:"27" },
        { num:37, type:"mc", question:"What does the IMF say is the effective global carbon price needed by 2030?", options:["A. $25 per tonne","B. $50 per tonne","C. $75 per tonne","D. $100 per tonne"], answer:"C" },
        { num:38, type:"fill", question:"The global average effective carbon price in 2023 was just _______ dollars per tonne.", answer:"5" },
        { num:39, type:"mc", question:"According to paragraph C, what is the investment-to-benefit ratio of the clean energy transition?", options:["A. Almost 1 to 1","B. Almost 2 to 1","C. Almost 3 to 1","D. Almost 4 to 1"], answer:"C" },
        { num:40, type:"fill", question:"The Warsaw International Mechanism for Loss and Damage was established in _______.", answer:"2013" }
      ]
    }
  ]},
  writing: {
    task1: { chart: "A line graph showing GDP growth rates (%) for Brazil, India, China and Germany from 2010 to 2023.", prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt: "Free trade between countries benefits everyone. To what extent do you agree or disagree?" }
  },
  speaking: {
    part1: { questions: ["Do you prefer to shop online or in physical stores? Why?","How do you decide how to spend your money?","Have your spending habits changed in recent years?","Do you think people in your country spend money wisely?"] },
    part2: { topic: "Describe a purchase you made that you were particularly happy with.", points: ["What you bought","When and where you bought it","Why you chose it","How it has benefited you"], followUp: "Do you think advertising influences people's purchasing decisions too much?" },
    part3: { questions: ["Is consumerism damaging to both individuals and society?","How does inequality affect people's ability to participate in the economy?","Should governments intervene to protect domestic industries from foreign competition?","How do you think globalisation has changed the way people shop and consume?"] }
  }
}
,

// TEST 8 — Art & Culture
{
  id: 8, topic: "Art & Culture",
  listening: { sections: [
    {
      description: "A phone call booking tickets for an art gallery exhibition",
      transcript: "Box Office: Good afternoon, the Meridian Gallery. Caller: I'd like to book tickets for the Impressionism Revisited exhibition. Box Office: It runs from Saturday the 14th of June to Sunday the 31st of August. Adult tickets are twelve pounds; concessions — students and over-60s — are seven pounds fifty. Caller: Two adults and one concession for Saturday the 21st of June at two pm. Box Office: Available. The slot lasts ninety minutes, including a twenty-minute introductory talk by curator Dr Helena Cross. Caller: Is there parking? Box Office: Yes, 80 spaces underground — first two hours free. Caller: My name is Raymond Cho, number 07834 661 290. Box Office: Total is thirty-one pounds fifty. We'll send email confirmation within 24 hours.",
      questions: [
        { num:1, type:"fill", question:"The exhibition is called Impressionism _______.", answer:"Revisited" },
        { num:2, type:"fill", question:"The exhibition runs until the 31st of _______.", answer:"August" },
        { num:3, type:"fill", question:"Adult tickets cost £_______.", answer:"twelve" },
        { num:4, type:"fill", question:"Concession tickets cost £_______ each.", answer:"7.50" },
        { num:5, type:"mc", question:"Who qualifies for a concession ticket?", options:["A. Under-18s and over-65s","B. Students and over-60s","C. Children under 12","D. Unemployed adults only"], answer:"B" },
        { num:6, type:"fill", question:"The visit includes a _______ -minute introductory talk.", answer:"twenty" },
        { num:7, type:"fill", question:"The talk is given by curator Dr Helena _______.", answer:"Cross" },
        { num:8, type:"mc", question:"How many parking spaces are available underground?", options:["A. 40","B. 60","C. 80","D. 100"], answer:"C" },
        { num:9, type:"fill", question:"The first _______ hours of parking are free.", answer:"two" },
        { num:10, type:"fill", question:"The total cost is £_______.", answer:"31.50" }
      ]
    },
    {
      description: "A podcast about the world's most visited museums in 2023",
      transcript: "Host: In 2023, the Louvre in Paris reclaimed its title as the world's most visited art museum with 8.9 million visitors — despite recording only 2.8 million in 2020. The Metropolitan Museum of Art in New York received 5.9 million visitors. The British Museum in London welcomed 5.8 million. The Vatican Museums attracted 7.2 million, boosted by a major Sistine Chapel ceiling restoration completed in 1994 at a cost of 4.2 million US dollars. The Palace Museum — the Forbidden City in Beijing — received 14 million visitors, making it the world's most visited museum overall. It holds a collection of 1.86 million artefacts. The British Museum's online collection now comprises over 4.5 million objects and receives more digital visits than physical ones.",
      questions: [
        { num:11, type:"fill", question:"The Louvre received _______ million visitors in 2023.", answer:"8.9" },
        { num:12, type:"fill", question:"The Louvre recorded only _______ million visitors in 2020.", answer:"2.8" },
        { num:13, type:"fill", question:"The Metropolitan Museum received _______ million visitors.", answer:"5.9" },
        { num:14, type:"mc", question:"How many visitors did the Vatican Museums attract?", options:["A. 5.8 million","B. 6.5 million","C. 7.2 million","D. 8.1 million"], answer:"C" },
        { num:15, type:"fill", question:"The Sistine Chapel restoration was completed in _______.", answer:"1994" },
        { num:16, type:"fill", question:"The restoration cost _______ million US dollars.", answer:"4.2" },
        { num:17, type:"fill", question:"The Palace Museum received _______ million visitors in 2023.", answer:"14" },
        { num:18, type:"mc", question:"How many artefacts does the Palace Museum collection contain?", options:["A. 1.26 million","B. 1.56 million","C. 1.86 million","D. 2.16 million"], answer:"C" },
        { num:19, type:"fill", question:"The British Museum's online collection comprises over _______ million objects.", answer:"4.5" },
        { num:20, type:"mc", question:"Which museum is described as the world's most visited overall?", options:["A. The Louvre","B. The Metropolitan Museum","C. The British Museum","D. The Palace Museum"], answer:"D" }
      ]
    },
    {
      description: "Students and tutor discussing arts funding and its social value",
      transcript: "Tutor: What arguments support government investment in the arts? Priya: In the UK, creative industries generated £116 billion in gross value added in 2022 — 5.9 percent of the economy — and employ 2.4 million people, growing at twice the rate of the wider economy. James: A 2019 All-Party Parliamentary Group report found arts participation reduces social isolation, with a 23 percent improvement in wellbeing among participants. Heritage tourism generates £26 billion annually for the UK. Tutor: The counterargument? James: Arts funding disproportionately benefits wealthier audiences — only 12 percent of arts audiences come from lower socioeconomic groups, despite representing 37 percent of the population. Tutor: That's the equity paradox of arts subsidy. Your essay must address it.",
      questions: [
        { num:21, type:"fill", question:"UK creative industries generated £_______ billion in gross value added in 2022.", answer:"116" },
        { num:22, type:"fill", question:"This represents _______ percent of the UK economy.", answer:"5.9" },
        { num:23, type:"fill", question:"Creative industries employ _______ million people in the UK.", answer:"2.4" },
        { num:24, type:"mc", question:"At what rate are creative industries growing compared to the wider economy?", options:["A. Same rate","B. Twice the rate","C. Three times the rate","D. Half the rate"], answer:"B" },
        { num:25, type:"fill", question:"Arts participation produced a _______ percent improvement in wellbeing.", answer:"23" },
        { num:26, type:"fill", question:"Heritage tourism generates £_______ billion annually for the UK.", answer:"26" },
        { num:27, type:"fill", question:"Only _______ percent of arts audiences come from lower socioeconomic groups.", answer:"12" },
        { num:28, type:"mc", question:"What percentage of the population do lower socioeconomic groups represent?", options:["A. 27%","B. 32%","C. 37%","D. 42%"], answer:"C" },
        { num:29, type:"mc", question:"What term does the tutor use for the imbalance in arts subsidy benefits?", options:["A. Arts inequality","B. Cultural gap","C. Equity paradox","D. Subsidy problem"], answer:"C" },
        { num:30, type:"fill", question:"The All-Party Parliamentary Group report was published in _______.", answer:"2019" }
      ]
    },
    {
      description: "A lecture on public art and censorship in history",
      transcript: "Lecturer: Diego Rivera's mural at the Rockefeller Center in New York, completed in 1933, was destroyed after Rockefeller demanded Rivera remove a portrait of Lenin. Rivera refused, and the mural was demolished. In more recent history, Banksy — the anonymous British street artist — used public art as political commentary. Balloon Girl sold at Sotheby's in 2018 for 1.04 million pounds before being partially shredded by a mechanism hidden in the frame. The work was renamed Love is in the Bin. The shredded version sold again in 2021 for 18.6 million pounds — eighteen times its pre-shredding price — raising profound questions about commodification and the art market.",
      questions: [
        { num:31, type:"fill", question:"Diego Rivera's mural was at the Rockefeller Center in _______.", answer:"New York" },
        { num:32, type:"fill", question:"The mural was completed in _______.", answer:"1933" },
        { num:33, type:"fill", question:"Rivera refused to remove his portrait of _______.", answer:"Lenin" },
        { num:34, type:"mc", question:"What happened to Rivera's mural?", options:["A. It was moved to a museum","B. It was sold at auction","C. It was demolished","D. It was repainted"], answer:"C" },
        { num:35, type:"fill", question:"Banksy's Balloon Girl sold at Sotheby's in _______.", answer:"2018" },
        { num:36, type:"fill", question:"It sold for _______ million pounds.", answer:"1.04" },
        { num:37, type:"mc", question:"What happened to the work at auction?", options:["A. It was stolen","B. It was partially shredded","C. It was withdrawn from sale","D. It was refused by the buyer"], answer:"B" },
        { num:38, type:"fill", question:"The shredded work was renamed Love is in the _______.", answer:"Bin" },
        { num:39, type:"fill", question:"The shredded version sold in 2021 for _______ million pounds.", answer:"18.6" },
        { num:40, type:"mc", question:"How many times more did the shredded version sell for versus its pre-shredding price?", options:["A. Eight times","B. Twelve times","C. Fifteen times","D. Eighteen times"], answer:"D" }
      ]
    }
  ]},
  reading: { passages: [
    {
      title: "The Globalisation of Contemporary Art",
      text: "<p><span class='para-label'>A</span>The global contemporary art market reached an estimated 65 billion US dollars in 2023, according to the Art Basel and UBS Global Art Market Report. The market is dominated by three cities: New York, London, and Hong Kong together account for approximately 80 percent of global auction sales by value. The United States alone commands 43 percent of the global art market share, followed by the United Kingdom at 17 percent and China at 17 percent. The market is highly concentrated at the top: the 100 best-selling living artists account for more than half of all primary market sales.</p>\n<p><span class='para-label'>B</span>The rise of the global art market has been accompanied by growing diversity in the artists receiving international recognition. African and African diaspora artists — including Njideka Akunyili Crosby, whose works have sold for over 3 million dollars each — have achieved record prices at international auctions. The 2022 Venice Biennale awarded its Golden Lion for Best National Participation to Uganda for the first time. Indigenous artists from Australia, Canada, and South America have gained unprecedented international visibility.</p>\n<p><span class='para-label'>C</span>Critics argue that the globalisation of the art world reproduces existing power structures rather than genuinely redistributing cultural authority. The dominant institutions — major auction houses, blue-chip galleries, and art fairs — remain concentrated in Western cities. Artists outside this network struggle to achieve international visibility regardless of quality. The art historian Pamela Lee has described this as 'chronopolitics' — the power to determine which art histories are recognised as globally significant.</p>\n<p><span class='para-label'>D</span>The digital revolution has opened new pathways. Non-fungible tokens (NFTs) briefly transformed the market in 2021: the digital artist Beeple's work Everydays: The First 5000 Days sold at Christie's for 69.3 million US dollars in March 2021 — the third highest price ever achieved by a living artist at the time. Though NFT sales collapsed by 97 percent in 2022, the technology catalysed wider discussion about digital art, provenance, and ownership.</p>\n<p><span class='para-label'>E</span>Cultural heritage and its ownership remain intensely contested. The Benin Bronzes — over 3,000 metal sculptures looted from the Kingdom of Benin by British forces in 1897 — are held across European and American museums. The Smithsonian Institution agreed in 2022 to transfer ownership of its 29 bronzes to Nigeria. Germany agreed to return over 1,000 pieces. The British Museum, holding around 900 bronzes, has resisted repatriation, citing the British Museum Act of 1963 which prohibits permanent removal of objects from its collection.</p>",
      questions: [
        { num:1, type:"fill", question:"The global art market reached _______ billion US dollars in 2023.", answer:"65" },
        { num:2, type:"mc", question:"What percentage of global auction sales do New York, London, and Hong Kong account for?", options:["A. 60%","B. 70%","C. 80%","D. 90%"], answer:"C" },
        { num:3, type:"fill", question:"The United States commands _______ percent of the global art market.", answer:"43" },
        { num:4, type:"mc", question:"Njideka Akunyili Crosby's works have sold for over how much each?", options:["A. $1 million","B. $2 million","C. $3 million","D. $5 million"], answer:"C" },
        { num:5, type:"fill", question:"The 2022 Venice Biennale Golden Lion was awarded to _______ for the first time.", answer:"Uganda" },
        { num:6, type:"fill", question:"Beeple's Everydays sold for _______ million US dollars.", answer:"69.3" },
        { num:7, type:"fill", question:"Beeple's work sold in March _______.", answer:"2021" },
        { num:8, type:"mc", question:"By how much did NFT sales collapse in 2022?", options:["A. 57%","B. 77%","C. 87%","D. 97%"], answer:"D" },
        { num:9, type:"fill", question:"The Benin Bronzes were looted by British forces in _______.", answer:"1897" },
        { num:10, type:"fill", question:"The Smithsonian agreed to transfer _______ bronzes to Nigeria.", answer:"29" },
        { num:11, type:"mc", question:"Why has the British Museum resisted repatriation of the Benin Bronzes?", options:["A. It claims ownership by purchase","B. It cites the British Museum Act of 1963","C. It disputes their historical origin","D. Nigeria has not formally requested them"], answer:"B" },
        { num:12, type:"fill", question:"The British Museum holds around _______ Benin Bronzes.", answer:"900" },
        { num:13, type:"mc", question:"Which term does Pamela Lee use to describe concentrated cultural power?", options:["A. Cultural imperialism","B. Artopolitics","C. Chronopolitics","D. Geoaesthetics"], answer:"C" }
      ]
    },
    {
      title: "Music, Identity, and the Streaming Revolution",
      text: "<p><span class='para-label'>A</span>Music is among the most powerful expressions of cultural identity. The UNESCO Convention on the Protection and Promotion of the Diversity of Cultural Expressions, adopted in 2005 and ratified by 149 countries, recognises cultural expressions — including music — as having intrinsic value beyond their economic worth. The convention acknowledges the risk that cultural globalisation, driven by the concentration of media and entertainment industries, may marginalise or eliminate musical traditions from smaller cultures.</p>\n<p><span class='para-label'>B</span>Reggae music, originating in Jamaica in the late 1960s, spread globally through the Jamaican diaspora. In 2018, UNESCO inscribed reggae on its Representative List of the Intangible Cultural Heritage of Humanity, recognising its social and political significance. K-pop — South Korean popular music — has challenged the dominance of English-language music. BTS became the first Korean act to top the US Billboard Hot 100 chart in 2020. The K-pop industry generated approximately 12 billion US dollars for the South Korean economy in 2022.</p>\n<p><span class='para-label'>C</span>The digital revolution transformed music production and distribution. Streaming platforms dominated by 2023: Spotify reported 602 million monthly active users and 236 million premium subscribers. Global recorded music revenue grew for the ninth consecutive year in 2023, reaching 28.6 billion US dollars. Streaming accounted for 84 percent of total revenue. However, Spotify pays between 0.003 and 0.005 US dollars per stream, meaning an artist needs approximately 250 streams to earn one dollar.</p>\n<p><span class='para-label'>D</span>Music education remains contested, often among the first subjects cut when budgets tighten. A 2019 meta-analysis of 54 studies found that music training is associated with enhanced language development, improved mathematical ability, and higher academic achievement overall. Longitudinal research from Germany found that children receiving sustained music education achieved significantly better outcomes in reading and arithmetic by age ten compared to children who received no music instruction.</p>\n<p><span class='para-label'>E</span>The live music industry has proved more resilient to digital disruption than recorded music. Global live music revenue reached 31 billion US dollars in 2023 — exceeding recorded music revenue for the first time since the 1990s. Taylor Swift's Eras Tour in 2023–2024 grossed over 2 billion US dollars, becoming the highest-grossing concert tour in history. Economists estimated the tour generated 5 billion US dollars in consumer spending in the United States alone, illustrating the broader economic ecosystem that live music anchors.</p>",
      questions: [
        { num:14, type:"fill", question:"The UNESCO Convention on Cultural Expressions was adopted in _______.", answer:"2005" },
        { num:15, type:"fill", question:"The convention has been ratified by _______ countries.", answer:"149" },
        { num:16, type:"fill", question:"Reggae originated in Jamaica in the late _______ s.", answer:"1960" },
        { num:17, type:"fill", question:"UNESCO inscribed reggae on its heritage list in _______.", answer:"2018" },
        { num:18, type:"fill", question:"BTS topped the US Billboard Hot 100 in _______.", answer:"2020" },
        { num:19, type:"fill", question:"Spotify reported _______ million monthly active users.", answer:"602" },
        { num:20, type:"mc", question:"What percentage of recorded music revenue did streaming account for in 2023?", options:["A. 64%","B. 74%","C. 84%","D. 94%"], answer:"C" },
        { num:21, type:"fill", question:"Global recorded music revenue reached _______ billion US dollars in 2023.", answer:"28.6" },
        { num:22, type:"mc", question:"How much does Spotify pay per stream?", options:["A. $0.001–0.002","B. $0.003–0.005","C. $0.01–0.02","D. $0.05–0.10"], answer:"B" },
        { num:23, type:"fill", question:"K-pop generated approximately _______ billion US dollars for South Korea in 2022.", answer:"12" },
        { num:24, type:"fill", question:"The 2019 meta-analysis of music education covered _______ studies.", answer:"54" },
        { num:25, type:"mc", question:"Global live music revenue in 2023 was:", options:["A. $21 billion","B. $26 billion","C. $31 billion","D. $36 billion"], answer:"C" },
        { num:26, type:"fill", question:"Taylor Swift's Eras Tour grossed over _______ billion US dollars.", answer:"2" }
      ]
    },
    {
      title: "Photography: Art, Documentation, and Authenticity",
      text: "<p><span class='para-label'>A</span>Since its invention in 1839 — attributed to Louis Daguerre in France and William Henry Fox Talbot in England — photography has served as both documentary medium and art form. As Susan Sontag wrote in her 1977 essay collection On Photography, 'To photograph is to appropriate the thing photographed.' The camera, in Sontag's analysis, does not simply capture reality but constructs a particular version of it, shaped by the choices of the photographer.</p>\n<p><span class='para-label'>B</span>Documentary photography achieved its greatest social impact in the twentieth century. Dorothea Lange's 1936 photograph Migrant Mother — depicting Florence Owens Thompson, a destitute pea-picker with her children during the Great Depression — is credited with prompting the US government to send 20,000 pounds of food to California migrant camps. Nick Ut's 1972 photograph of nine-year-old Kim Phuc fleeing a napalm attack in Vietnam won the Pulitzer Prize and is widely cited as influencing American public opinion against the Vietnam War.</p>\n<p><span class='para-label'>C</span>The digital revolution has democratised photography to an unprecedented degree. As of 2024, approximately 1.8 trillion photographs are taken globally each year — roughly 57,000 per second — the vast majority on smartphones. Instagram, launched in 2010, has over 2 billion monthly active users who share approximately 100 million images daily.</p>\n<p><span class='para-label'>D</span>Photojournalism faces a crisis of credibility exacerbated by AI. AI image generation tools can produce photorealistic images of events that never occurred. In 2023, AI-generated photographs won categories in several international competitions before being identified as artificial. The World Press Photo organisation introduced mandatory AI disclosure requirements for all submissions from 2024.</p>\n<p><span class='para-label'>E</span>Despite these challenges, photojournalism retains unique evidential power. During the Syrian civil war, photographs smuggled out by a defector codenamed Caesar — comprising over 55,000 images documenting the killing of 11,000 detainees — were presented to the United Nations Human Rights Council in 2014 and formed the basis of subsequent international criminal proceedings.</p>",
      questions: [
        { num:27, type:"fill", question:"Photography is attributed to Louis Daguerre and William Henry Fox _______.", answer:"Talbot" },
        { num:28, type:"fill", question:"Photography was invented in _______.", answer:"1839" },
        { num:29, type:"fill", question:"Sontag's On Photography was published in _______.", answer:"1977" },
        { num:30, type:"mc", question:"When was Dorothea Lange's Migrant Mother taken?", options:["A. 1929","B. 1933","C. 1936","D. 1942"], answer:"C" },
        { num:31, type:"fill", question:"The US government sent _______ pounds of food to California migrant camps.", answer:"20,000" },
        { num:32, type:"fill", question:"Nick Ut's photograph was taken in _______.", answer:"1972" },
        { num:33, type:"mc", question:"What was Nick Ut's photograph of?", options:["A. A child fleeing a napalm attack","B. A soldier carrying a wounded comrade","C. Civilians crossing a border","D. A bombed village"], answer:"A" },
        { num:34, type:"fill", question:"Approximately _______ trillion photographs are taken each year.", answer:"1.8" },
        { num:35, type:"mc", question:"How many images are shared on Instagram daily?", options:["A. 50 million","B. 100 million","C. 150 million","D. 200 million"], answer:"B" },
        { num:36, type:"fill", question:"Instagram was launched in _______.", answer:"2010" },
        { num:37, type:"fill", question:"The Syrian defector was codenamed _______.", answer:"Caesar" },
        { num:38, type:"fill", question:"Caesar's images documented the killing of _______ detainees.", answer:"11,000" },
        { num:39, type:"mc", question:"When were Caesar's photographs presented to the UN Human Rights Council?", options:["A. 2012","B. 2013","C. 2014","D. 2015"], answer:"C" },
        { num:40, type:"mc", question:"What has World Press Photo introduced from 2024?", options:["A. A ban on AI-edited images","B. Mandatory AI disclosure requirements","C. New category for AI photography","D. Size limits on submissions"], answer:"B" }
      ]
    }
  ]},
  writing: {
    task1: { chart: "A table showing museum visitor numbers (millions) in 2015 and 2023: Louvre 8.7/8.9, British Museum 6.8/5.9, Vatican 6.0/7.2, MoMA 3.0/2.1.", prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt: "Governments should spend money on arts and culture even when there are other pressing social needs. Discuss both views and give your own opinion." }
  },
  speaking: {
    part1: { questions: ["What types of art, music, or cultural activities do you enjoy?","Have you ever visited an art gallery or museum? What was it like?","Is art and culture important in your country's education system?","Do you think art should be accessible to everyone for free?"] },
    part2: { topic: "Describe a work of art (painting, sculpture, or film) that moved you.", points: ["What the work is","Where you encountered it","What it depicts or expresses","Why it had an emotional effect on you"], followUp: "Do you think art needs to be beautiful in order to be valuable?" },
    part3: { questions: ["Should governments fund the arts, or should art be self-sustaining through the market?","How does art reflect and challenge social values?","Do you think digital technology has changed the way people experience art?","Is it appropriate to return cultural artefacts to their countries of origin?"] }
  }
},

// TEST 9 — Science & Research
{
  id: 9, topic: "Science & Research",
  listening: { sections: [
    {
      description: "A phone enquiry about a university science research placement",
      transcript: "Administrator: Good morning, Institute for Molecular Biology, Dr Farrukh's lab. Caller: I'm calling about the summer research placement in your genomics team. Administrator: It runs from the 7th of July to the 29th of August — eight weeks. The placement is unpaid but includes a weekly travel allowance of forty-five pounds. Applicants must be in at least their second year of a biology or biochemistry degree with a minimum grade average of 65 percent. The work involves DNA extraction, PCR analysis, and data entry. You'll attend weekly seminars on Thursdays at 11am. The deadline is the 15th of May. You need a CV, a personal statement of no more than 500 words, and one academic reference. Caller: My name is Orla McNamara. Administrator: I'll email you the application form today.",
      questions: [
        { num:1, type:"fill", question:"The placement is in the _______ team.", answer:"genomics" },
        { num:2, type:"fill", question:"The placement runs for _______ weeks.", answer:"eight" },
        { num:3, type:"fill", question:"The weekly travel allowance is £_______.", answer:"45" },
        { num:4, type:"mc", question:"What minimum year of study is required?", options:["A. First year","B. Second year","C. Third year","D. Final year only"], answer:"B" },
        { num:5, type:"fill", question:"The minimum grade average required is _______ percent.", answer:"65" },
        { num:6, type:"mc", question:"Which of the following is listed as part of the placement work?", options:["A. Animal testing","B. PCR analysis","C. Clinical trials","D. Field surveys"], answer:"B" },
        { num:7, type:"fill", question:"Weekly seminars are held on _______ at 11am.", answer:"Thursdays" },
        { num:8, type:"fill", question:"The application deadline is the _______ of May.", answer:"15th" },
        { num:9, type:"mc", question:"What is the maximum length of the personal statement?", options:["A. 300 words","B. 400 words","C. 500 words","D. 600 words"], answer:"C" },
        { num:10, type:"fill", question:"The caller's surname is _______.", answer:"McNamara" }
      ]
    },
    {
      description: "A science documentary about the Human Genome Project",
      transcript: "Narrator: The Human Genome Project was launched in 1990 as an international collaboration involving 20 research institutions across 6 countries, aiming to map the complete sequence of 3.2 billion DNA base pairs. The project was officially completed on April 14th, 2003 — two years ahead of schedule — at a total cost of 3 billion US dollars. The draft genome published in 2001 revealed that humans have only approximately 20,000 to 25,000 protein-coding genes — far fewer than the 100,000 previously estimated. The data has generated an estimated 1 trillion dollars in US economic activity by 2013, per a Battelle Memorial Institute report. Today, a human genome can be sequenced in a single day for under 200 US dollars.",
      questions: [
        { num:11, type:"fill", question:"The Human Genome Project was launched in _______.", answer:"1990" },
        { num:12, type:"fill", question:"It involved _______ research institutions.", answer:"20" },
        { num:13, type:"fill", question:"The human genome consists of _______ billion DNA base pairs.", answer:"3.2" },
        { num:14, type:"fill", question:"The project was completed on April 14th, _______.", answer:"2003" },
        { num:15, type:"mc", question:"How much earlier than scheduled was the project completed?", options:["A. One year","B. Two years","C. Three years","D. Five years"], answer:"B" },
        { num:16, type:"fill", question:"The total cost was _______ billion US dollars.", answer:"3" },
        { num:17, type:"mc", question:"How many protein-coding genes do humans have according to the 2001 draft?", options:["A. 10,000–15,000","B. 15,000–20,000","C. 20,000–25,000","D. 30,000–40,000"], answer:"C" },
        { num:18, type:"fill", question:"The data generated an estimated _______ trillion dollars in US economic activity by 2013.", answer:"1" },
        { num:19, type:"fill", question:"Today, a genome can be sequenced in a single day for under _______ US dollars.", answer:"200" },
        { num:20, type:"mc", question:"Which institution produced the report on economic activity generated by genome data?", options:["A. MIT","B. Stanford","C. Battelle Memorial Institute","D. NIH"], answer:"C" }
      ]
    },
    {
      description: "Students and supervisor discussing a climate science research paper",
      transcript: "Dr Patel: Let's review your draft on Arctic sea ice decline. Yuna: Arctic summer sea ice extent has declined by 13 percent per decade since 1979, based on NASA satellite data. In September 2012, the Arctic reached its lowest recorded summer sea ice extent of 3.41 million square kilometres. Marcus: If current trends continue, the Arctic could experience its first ice-free summer by 2040. The IPCC Sixth Assessment Report, published in 2021, projects this under high-emission pathways. Yuna: The albedo feedback mechanism — as ice melts, darker ocean absorbs more heat. Albedo of sea ice is 0.6 while open ocean is only 0.06. Dr Patel: Have you addressed limitations? Marcus: Yes — the satellite record only goes back to 1979. Our model uses a spatial resolution of 25 kilometres. The paper is due Friday at 5pm.",
      questions: [
        { num:21, type:"fill", question:"Arctic summer sea ice has declined by _______ percent per decade since 1979.", answer:"13" },
        { num:22, type:"fill", question:"The lowest recorded Arctic sea ice extent was _______ million square kilometres.", answer:"3.41" },
        { num:23, type:"fill", question:"This record was set in September _______.", answer:"2012" },
        { num:24, type:"mc", question:"When could the Arctic experience its first ice-free summer?", options:["A. 2030","B. 2035","C. 2040","D. 2050"], answer:"C" },
        { num:25, type:"fill", question:"The IPCC Sixth Assessment Report was published in _______.", answer:"2021" },
        { num:26, type:"fill", question:"The albedo of sea ice is _______.", answer:"0.6" },
        { num:27, type:"fill", question:"The albedo of open ocean is _______.", answer:"0.06" },
        { num:28, type:"mc", question:"What is the albedo feedback mechanism?", options:["A. Greenhouse gas trapping heat","B. Melting ice exposing darker ocean that absorbs more heat","C. Ocean currents redistributing warmth","D. Clouds reflecting sunlight"], answer:"B" },
        { num:29, type:"fill", question:"The satellite record only goes back to _______.", answer:"1979" },
        { num:30, type:"fill", question:"The model uses a spatial resolution of _______ kilometres.", answer:"25" }
      ]
    },
    {
      description: "A lecture on CRISPR gene-editing technology",
      transcript: "Lecturer: CRISPR-Cas9 was first described as a genome-editing tool in a landmark 2012 paper by Jennifer Doudna and Emmanuelle Charpentier, who shared the Nobel Prize in Chemistry in 2020. CRISPR stands for Clustered Regularly Interspaced Short Palindromic Repeats. It allows scientists to cut DNA at specific locations with unprecedented precision and either disable genes or insert new sequences. In December 2023, the FDA approved the first CRISPR-based therapy, Casgevy, for sickle cell disease and beta-thalassaemia. The therapy shows a functional cure in 97 percent of treated patients in trials. However, CRISPR raises ethical questions about heritable germline editing — changes passed to future generations. In November 2018, Chinese scientist He Jiankui announced the birth of the world's first CRISPR-edited babies, causing international condemnation and leading to his imprisonment for three years.",
      questions: [
        { num:31, type:"fill", question:"CRISPR was described as a genome-editing tool in _______.", answer:"2012" },
        { num:32, type:"fill", question:"The Nobel Prize was shared by Jennifer Doudna and Emmanuelle _______.", answer:"Charpentier" },
        { num:33, type:"fill", question:"They won the Nobel Prize in Chemistry in _______.", answer:"2020" },
        { num:34, type:"fill", question:"CRISPR stands for Clustered Regularly Interspaced Short Palindromic _______.", answer:"Repeats" },
        { num:35, type:"mc", question:"What was the first CRISPR therapy approved by the FDA?", options:["A. CRISPRx","B. Casgevy","C. GenEdit","D. HealCut"], answer:"B" },
        { num:36, type:"fill", question:"Casgevy was approved in December _______.", answer:"2023" },
        { num:37, type:"fill", question:"The therapy shows a functional cure in _______ percent of treated patients.", answer:"97" },
        { num:38, type:"mc", question:"What is germline editing?", options:["A. Editing cells in a lab only","B. Editing only cancer cells","C. Changes that would be passed to future generations","D. Temporary gene suppression"], answer:"C" },
        { num:39, type:"fill", question:"He Jiankui made his announcement in November _______.", answer:"2018" },
        { num:40, type:"fill", question:"He Jiankui was imprisoned for _______ years.", answer:"three" }
      ]
    }
  ]},
  reading: { passages: [
    {
      title: "The Scientific Method and Its Limits",
      text: "<p><span class='para-label'>A</span>The scientific method — systematic observation, hypothesis formation, experimentation, and peer review — is the foundation of modern science. Its origins are traced to Francis Bacon, who in his 1620 work Novum Organum advocated inductive reasoning based on observation. Karl Popper added the criterion of falsifiability: a hypothesis is scientific only if it could in principle be proven wrong. A hypothesis that cannot be falsified falls outside the domain of science.</p>\n<p><span class='para-label'>B</span>The peer review system has significant weaknesses. The replication crisis — the discovery that many published findings in psychology, biomedicine, and social science cannot be reproduced — has shaken confidence in the literature. A 2015 project led by Brian Nosek attempted to replicate 100 published psychology experiments; only 36 percent successfully replicated. The pharmaceutical company Bayer found that only 25 percent of published preclinical findings could be replicated internally.</p>\n<p><span class='para-label'>C</span>Publication bias — the tendency to publish positive results while rejecting null results — skews the scientific literature. A study of clinical trials found that trials with positive outcomes were twice as likely to be published as those with negative outcomes. Pre-registration of clinical trials — requiring researchers to register hypotheses and methods before collecting data — is now mandatory for clinical trials in the European Union.</p>\n<p><span class='para-label'>D</span>The commercialisation of research presents further challenges. A 2006 study found that pharmaceutical industry-funded trials were 3.6 times more likely to report favourable results for the sponsor's product than independently funded trials. The Cochrane Collaboration explicitly excludes commercially funded reviews from its database to protect against this bias.</p>\n<p><span class='para-label'>E</span>Despite its imperfections, science remains uniquely self-correcting. The COVID-19 pandemic demonstrated this in real time: within one year of the virus's identification, multiple effective vaccines were developed, drawing on decades of prior research in mRNA technology. The speed — a vaccine developed in eleven months compared to the previous fastest of four years for mumps — represents one of the most remarkable demonstrations of scientific capacity in human history.</p>",
      questions: [
        { num:1, type:"fill", question:"Francis Bacon's Novum Organum was published in _______.", answer:"1620" },
        { num:2, type:"fill", question:"Karl Popper added the criterion of _______.", answer:"falsifiability" },
        { num:3, type:"mc", question:"What percentage of psychology experiments successfully replicated in the 2015 project?", options:["A. 16%","B. 26%","C. 36%","D. 46%"], answer:"C" },
        { num:4, type:"fill", question:"The 2015 replication project was led by Brian _______.", answer:"Nosek" },
        { num:5, type:"mc", question:"What percentage of preclinical findings could Bayer replicate internally?", options:["A. 15%","B. 25%","C. 35%","D. 45%"], answer:"B" },
        { num:6, type:"fill", question:"Trials with positive outcomes were _______ as likely to be published.", answer:"twice" },
        { num:7, type:"mc", question:"What is pre-registration designed to counteract?", options:["A. Data fraud","B. Publication bias","C. Funding bias","D. Peer review failure"], answer:"B" },
        { num:8, type:"fill", question:"Industry-funded trials were _______ times more likely to report favourable results.", answer:"3.6" },
        { num:9, type:"mc", question:"What does the Cochrane Collaboration exclude from its database?", options:["A. Unpublished studies","B. Non-English studies","C. Commercially funded reviews","D. Small sample studies"], answer:"C" },
        { num:10, type:"fill", question:"The previous fastest vaccine development was _______ years, for mumps.", answer:"four" },
        { num:11, type:"fill", question:"The COVID vaccine was developed in _______ months.", answer:"eleven" },
        { num:12, type:"mc", question:"Which technology underpinned the rapid COVID vaccine development?", options:["A. CRISPR","B. PCR","C. mRNA","D. Antibody therapy"], answer:"C" },
        { num:13, type:"mc", question:"What does 'publication bias' refer to?", options:["A. Preferring famous scientists","B. Tendency to publish positive results over null results","C. Publishing only peer-reviewed work","D. Favouring papers from top universities"], answer:"B" }
      ]
    },
    {
      title: "Space Telescopes and the Expanding Universe",
      text: "<p><span class='para-label'>A</span>The Hubble Space Telescope, launched on April 24th 1990, has transformed humanity's understanding of the universe. Operating above Earth's atmosphere, Hubble captured images of unprecedented clarity. Its observations confirmed the universe is approximately 13.8 billion years old and provided evidence for supermassive black holes at the centres of most large galaxies. Hubble has made over 1.5 million observations and its data has contributed to more than 19,000 peer-reviewed scientific papers.</p>\n<p><span class='para-label'>B</span>Hubble's most transformative contribution involved dark energy. In 1998, two independent teams used Hubble observations to discover that the expansion of the universe is accelerating — contrary to the assumption that gravity would slow expansion. This implied the existence of an unknown energy named dark energy. The team leaders were awarded the Nobel Prize in Physics in 2011.</p>\n<p><span class='para-label'>C</span>The James Webb Space Telescope (JWST), launched December 25th 2021, represents the next generation of space observation. Operating primarily in the infrared spectrum, JWST can see through dust clouds obscuring optical telescopes and observe the earliest galaxies. Its primary mirror spans 6.5 metres — nearly three times the diameter of Hubble's. JWST cost 10 billion US dollars and took 25 years to develop.</p>\n<p><span class='para-label'>D</span>Early JWST results have challenged existing cosmological models. Observations of galaxies existing less than 400 million years after the Big Bang — far more developed than predicted — suggest galaxy formation began earlier than current theory accounts for. Some cosmologists suggest these findings may require revisions to the standard model of cosmology, known as Lambda-CDM.</p>\n<p><span class='para-label'>E</span>The Square Kilometre Array (SKA), currently under construction with its core in South Africa and Australia, will be the world's largest radio telescope when complete, with a collecting area exceeding one square kilometre. SKA will explore the formation of the first stars and search for signs of extraterrestrial life. Its construction cost is estimated at 2 billion euros, funded by 16 member nations.</p>",
      questions: [
        { num:14, type:"fill", question:"The Hubble Space Telescope was launched on April 24th, _______.", answer:"1990" },
        { num:15, type:"fill", question:"The universe is approximately _______ billion years old.", answer:"13.8" },
        { num:16, type:"fill", question:"Hubble has made over _______ million observations.", answer:"1.5" },
        { num:17, type:"mc", question:"What discovery resulted from Hubble's 1998 observations?", options:["A. The Big Bang","B. Dark matter","C. Accelerating expansion of the universe","D. The first exoplanet"], answer:"C" },
        { num:18, type:"fill", question:"The Nobel Prize for this discovery was awarded in _______.", answer:"2011" },
        { num:19, type:"fill", question:"JWST was launched on December 25th, _______.", answer:"2021" },
        { num:20, type:"mc", question:"In which spectrum does JWST primarily operate?", options:["A. Ultraviolet","B. Visible","C. Infrared","D. Radio"], answer:"C" },
        { num:21, type:"fill", question:"JWST's primary mirror spans _______ metres.", answer:"6.5" },
        { num:22, type:"fill", question:"JWST cost _______ billion US dollars.", answer:"10" },
        { num:23, type:"mc", question:"What have JWST's early results found about galaxy formation?", options:["A. The universe is younger than thought","B. Dark energy does not exist","C. Galaxies formed earlier and faster than predicted","D. The Big Bang did not produce hydrogen"], answer:"C" },
        { num:24, type:"fill", question:"The standard model of cosmology is known as _______.", answer:"Lambda-CDM" },
        { num:25, type:"fill", question:"The SKA will have a collecting area exceeding _______ square kilometre.", answer:"one" },
        { num:26, type:"mc", question:"How many nations fund the SKA?", options:["A. 8","B. 12","C. 16","D. 20"], answer:"C" }
      ]
    },
    {
      title: "Artificial Intelligence in Scientific Discovery",
      text: "<p><span class='para-label'>A</span>Artificial intelligence is accelerating scientific discovery across disciplines. In 2020, DeepMind's AlphaFold 2 solved the protein folding problem — predicting three-dimensional protein structures from amino acid sequences with near-experimental accuracy. The achievement was described by biochemist Venki Ramakrishnan as one of the most important scientific advances of the past 50 years.</p>\n<p><span class='para-label'>B</span>By 2022, AlphaFold had predicted structures of over 200 million proteins — essentially the entire known protein universe — and made them freely available through the European Bioinformatics Institute. The database has been accessed by over one million researchers across 190 countries. In 2024, the researchers behind AlphaFold were awarded the Nobel Prize in Chemistry.</p>\n<p><span class='para-label'>C</span>In drug discovery, AI is compressing timelines that once spanned decades. Traditional drug development takes an average of 12 to 15 years and costs approximately 2.6 billion US dollars per approved drug. AI-assisted company Insilico Medicine achieved preclinical candidate identification in 18 months — a process traditionally taking 4 to 5 years. The first AI-discovered drug entered phase 1 clinical trials in 2021.</p>\n<p><span class='para-label'>D</span>In 2023, Google DeepMind's GNoME system predicted the structures of 2.2 million new stable materials — including 380,000 previously unknown stable crystals — vastly expanding the inventory of potential materials for batteries, superconductors, and solar cells. The traditional experimental approach produces approximately 1,000 new materials per year; GNoME's predictions represent 800 years of discovery compressed into a single computational run.</p>\n<p><span class='para-label'>E</span>Significant concerns attend the integration of AI into science. The opacity of deep learning models — the 'black box' problem — makes it difficult to understand why an AI reached a particular conclusion. AI systems trained on existing literature risk perpetuating biases in scientific knowledge. There are also concerns about concentration of AI research capacity in a small number of private companies, which may skew scientific inquiry toward commercially valuable rather than socially important questions.</p>",
      questions: [
        { num:27, type:"fill", question:"DeepMind's AlphaFold 2 solved the protein folding problem in _______.", answer:"2020" },
        { num:28, type:"fill", question:"By 2022, AlphaFold predicted structures of over _______ million proteins.", answer:"200" },
        { num:29, type:"fill", question:"The database has been accessed by over _______ million researchers.", answer:"one" },
        { num:30, type:"mc", question:"For what did AlphaFold researchers win the Nobel Prize in Chemistry?", options:["A. Genome sequencing","B. Protein folding","C. Cancer immunotherapy","D. Superconductivity"], answer:"B" },
        { num:31, type:"fill", question:"Traditional drug development costs approximately _______ billion US dollars per approved drug.", answer:"2.6" },
        { num:32, type:"mc", question:"How long does traditional drug development take?", options:["A. 5–8 years","B. 8–12 years","C. 12–15 years","D. 15–20 years"], answer:"C" },
        { num:33, type:"fill", question:"The first AI-discovered drug entered phase 1 trials in _______.", answer:"2021" },
        { num:34, type:"fill", question:"GNoME predicted structures of _______ million new stable materials.", answer:"2.2" },
        { num:35, type:"mc", question:"How many previously unknown stable crystals did GNoME predict?", options:["A. 180,000","B. 280,000","C. 380,000","D. 480,000"], answer:"C" },
        { num:36, type:"fill", question:"The traditional approach produces approximately _______ new materials per year.", answer:"1,000" },
        { num:37, type:"mc", question:"What is the 'black box' problem in AI?", options:["A. AI using too much energy","B. Difficulty understanding why an AI reached a conclusion","C. AI producing biased datasets","D. AI replacing human researchers"], answer:"B" },
        { num:38, type:"fill", question:"Ramakrishnan described AlphaFold as one of the most important advances of the past _______ years.", answer:"50" },
        { num:39, type:"fill", question:"Insilico Medicine achieved preclinical candidate identification in _______ months.", answer:"18" },
        { num:40, type:"mc", question:"Where is the AlphaFold database hosted?", options:["A. MIT","B. Harvard Bioinformatics Institute","C. European Bioinformatics Institute","D. Google Cloud"], answer:"C" }
      ]
    }
  ]},
  writing: {
    task1: { chart: "A line graph showing the number of scientific publications per year from 2000 to 2023, split by USA, China, and EU.", prompt: "Summarise the information by selecting and reporting the main features and make comparisons where relevant." },
    task2: { prompt: "Scientific research should be directed by governments rather than private companies. To what extent do you agree?" }
  },
  speaking: {
    part1: { questions: ["Are you interested in science? Which areas interest you most?","Did you enjoy science lessons at school?","Do you follow scientific news?","How important is science in your daily life?"] },
    part2: { topic: "Describe a scientific discovery or invention that you find fascinating.", points: ["What it is","When it was discovered","How it works","Why you find it fascinating"], followUp: "Do you think any scientific discoveries have been harmful to humanity?" },
    part3: { questions: ["Should governments or private companies lead investment in scientific research?","How can societies ensure the benefits of scientific advances are shared equally?","Are there areas of research that should be restricted on ethical grounds?","How important is scientific literacy for the general public?"] }
  }
}