
// src/lib/personality_full_data.js
// Full content for 16 MBTI types. Each entry includes famous[] with image file paths.
// Put images in src/assets/famous/<TYPE>/<filename.jpg> (instructions below).

const PERSONALITY_FULL = {
  INFP: {
    title: "The Mediator",
    motto:
      "Meaning matters more than perfection. Stay true to your values, and your path will always feel authentic.",
    strengths: [
      "Deep emotional intuition and ability to sense the needs of others.",
      "Highly creative imagination that allows them to express complex ideas beautifully.",
      "Strong moral compass with a desire to make the world kinder.",
      "Excellent listener who makes people feel understood and valued.",
      "Can find meaning and symbolism in everyday events.",
      "Empathetic problem-solver who prioritizes harmony and emotional well-being.",
    ],
    weaknesses: [
      "Tends to avoid conflict even when confrontation is necessary.",
      "May take criticism personally due to emotional openness.",
      "Can become overwhelmed by chaotic or emotionally heavy environments.",
      "Struggles with practical tasks when not emotionally invested.",
      "Idealism can make them frustrated with routine and bureaucracy.",
    ],
    growth:
      "INFPs grow by channeling creative energy into consistent practice and by pairing their idealism with small, accountable routines. Building assertiveness helps them express needs without avoidance. Grounding practices like journaling and creative deadlines help translate ideals into reality.",
    growth_points: [
  "Build confidence in professional communication and assertiveness.",
  "Create gentle structure with time-blocking to protect your energy.",
  "Set small, realistic milestones to avoid overwhelm.",
  "Collaborate with people who respect your emotional depth.",
],

      work_style:
      "They seek meaningful, autonomous work where personal values matter. They prefer flexible environments and roles that allow creative expression, mentoring, or helping others.",
    relationship:
      "In relationships they seek depth, emotional honesty and authenticity. They give loyalty and empathy, and thrive with partners who respect their inner world.",
    roles: [
      "Counselor / Therapist",
      "Writer / Novelist",
      "Teacher / Coach",
      "Non-profit / Social impact roles",
      "Artist / Musician",
      "Wellness Practitioner",
    ],
    famous: [
      { name: "Princess Diana", img: "/src/assets/famous/INFP/princess_diana.jpg" },
      { name: "Alicia Keys", img: "/src/assets/famous/INFP/alicia_keys.jpg" },
      { name: "Franz Kafka", img: "/src/assets/famous/INFP/franz_kafka.jpg" },
      { name: "Sylvia Plath", img: "/src/assets/famous/INFP/sylvia_plath.jpg" },
    ],

    therapy: {
  subtitle: "INFPs feel emotions deeply — this is a gentle space for reflection, meaning-making, and creative grounding.",
  guided_reflection: [
    "What's one emotion you've been avoiding lately?",
    "What small creative ritual restores your sense of meaning?",
    "When did you last feel truly understood?",
    "What boundary would protect your energy this week?"
  ],
  calming_practices: [
    "10-min grounding meditation",
    "Draw or journal for 15 minutes",
    "Listen to ambient nature or lo-fi",
    "Take a mindful walk without your phone"
  ],
  gentle_reads: [
    { title: "Quiet: The Power of Introverts", author: "Susan Cain" },
    { title: "Emotional Agility", author: "Susan David" },
    { title: "The Artist's Way", author: "Julia Cameron" }
  ],

}

  },

  INFJ: {
    title: "The Advocate",
    motto:
      "Live according to your principles; when values lead, purpose follows.",
    strengths: [
      "Visionary insight and strong empathy for others.",
      "Committed to meaningful causes and long-term ideals.",
      "Able to connect complex ideas into practical strategies.",
      "Calm, patient, and excellent at reading people’s motivations.",
    ],
    weaknesses: [
      "Perfectionism and tendency to internalize stress.",
      "Can withdraw when misunderstood or pressured.",
      "Might neglect practical details while chasing a vision.",
    ],
    growth:
      "INFJs balance idealism with practical planning. They thrive when they pair intuition with systems that help implement their vision.",
    growth_points: [
  "Practice grounding yourself when idealism causes stress.",
  "Balance your empathy with practical boundaries.",
  "Break big visions into weekly actionable steps.",
  "Share emotional needs openly instead of withdrawing.",
],

      work_style:
      "Prefer purposeful roles with responsibility and autonomy: strategy, counseling, education, research.",
    relationship:
      "Seek deep emotional connection, loyalty and shared values; often devoted, but private about inner struggles.",
    roles: [
      "Psychologist / Therapist",
      "Strategic Planner",
      "Writer / Researcher",
      "Non-profit leader",
      "Educator",
    ],
    famous: [
      { name: "Mahatma Gandhi", img: "/src/assets/famous/INFJ/gandhi.jpg" },
      { name: "Carl Jung", img: "/src/assets/famous/INFJ/carl_jung.jpg" },
      { name: "Martin Luther King Jr.", img: "/src/assets/famous/INFJ/mlk.jpg" },
      { name: "Emily Brontë", img: "/src/assets/famous/INFJ/emily_bronte.jpg" },
    ],

    therapy: {
  subtitle: "INFJs are visionary and empathic. Use this space to translate insight into sustainable plans and compassionate self-care.",
  guided_reflection: [
    "What long-term value guides your decisions?",
    "Where do you need more self-compassion right now?",
    "Which relationships replenish you versus drain you?",
    "What small step could move a vision toward reality?"
  ],
  calming_practices: [
    "10–15 minute guided visualization",
    "Slow, reflective walks in nature",
    "Evening journaling with gratitude focus",
    "Breathwork for 3–5 minutes before sleep"
  ],
  gentle_reads: [
    { title: "Man's Search for Meaning", author: "Viktor Frankl" },
    { title: "Quiet Leadership", author: "David Rock" },
    { title: "Finding Your Element", author: "Ken Robinson" }
  ],

}

  },

  INTJ: {
    title: "The Architect",
    motto:
      "Design systems that scale — plan, test, and iterate with discipline.",
    strengths: [
      "Highly strategic and long-term thinking.",
      "Independent problem-solver with clear logic.",
      "Quick at seeing patterns and building frameworks.",
    ],
    weaknesses: [
      "Can be perceived as distant or overly critical.",
      "May neglect emotional nuance and day-to-day detail.",
    ],
    growth:
      "INTJs benefit from collaborating with empathetic partners and practicing communication that translates ideas into accessible steps.",
    growth_points: [
  "Practice emotional patience in team settings.",
  "Break perfectionism by shipping version 1 first.",
  "Balance logic with empathy when giving feedback.",
  "Share your long-term vision to align others with you.",
],

      work_style:
      "Prefer roles that allow deep focus, autonomy, and intellectual challenge.",
    relationship:
      "Loyal and selective; seek partners who respect independence and growth.",
    roles: [
      "Scientist / Researcher",
      "Engineer",
      "Systems Architect",
      "Academic / Strategist",
    ],
    famous: [
      { name: "Elon Musk", img: "/src/assets/famous/INTJ/elon.jpg" },
      { name: "Isaac Newton", img: "/src/assets/famous/INTJ/newton.jpg" },
      { name: "Hannah Arendt", img: "/src/assets/famous/INTJ/arendt.jpg" },
      { name: "Niccolò Machiavelli", img: "/src/assets/famous/INTJ/machiavelli.jpg" },
    ],

    therapy: {
  subtitle: "INTJs gain from turning strategy inward: build emotional models and practical rituals to support long-term goals.",
  guided_reflection: [
    "What system could simplify recurring stressors?",
    "Which feeling would you like to understand better?",
    "How do your goals align with your day-to-day habits?",
    "Where could you delegate to free up focus?"
  ],
  calming_practices: [
    "Structured 10-minute breathing breaks",
    "Single-task deep-focus sessions (Pomodoro)",
    "Strategic planning walk (brainstorm + walk)",
    "Short evening disconnect routine"
  ],
  gentle_reads: [
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
    { title: "Deep Work", author: "Cal Newport" },
    { title: "Atomic Habits", author: "James Clear" }
  ],

}

  },

  INTP: {
    title: "The Thinker",
    motto: "Question everything — clarity follows careful reasoning.",
    strengths: [
      "Curious, analytical, and inventive.",
      "Excellent at logical problem solving and modeling.",
      "Comfortable with complexity and novel ideas.",
    ],
    weaknesses: [
      "May procrastinate and leave projects unfinished.",
      "Can be socially awkward or blunt unintentionally.",
    ],
    growth:
      "INTPs thrive by pairing ideas with small commitments and practicing writing or teaching to clarify thought.",
    growth_points: [
  "Strengthen follow-through by pairing ideas with deadlines.",
  "Improve communication by explaining concepts simply.",
  "Collaborate to avoid getting stuck in analysis paralysis.",
  "Turn curiosity into progress by choosing one priority at a time.",
],

      work_style:
      "Prefer research, design, tech, or roles that reward clever solutions.",
    relationship:
      "Appreciate partners who value autonomy and intellectual play.",
    roles: [
      "Research Scientist",
      "Software Engineer",
      "Philosopher",
      "Data Scientist",
    ],
    famous: [
      { name: "Albert Einstein", img: "/src/assets/famous/INTP/einstein.jpg" },
      { name: "Marie Curie", img: "/src/assets/famous/INTP/curie.jpg" },
      { name: "John Locke", img: "/src/assets/famous/INTP/locke.jpg" },
      { name: "Bill Gates", img: "/src/assets/famous/INTP/gates.jpg" },
    ],

    therapy: {
  subtitle: "INTPs flourish when ideas meet small commitments. Use reflection to test assumptions and build mindful routines.",
  guided_reflection: [
    "Which idea keeps returning to you and why?",
    "What concrete step would show whether an idea works?",
    "When do you feel most present and curious?",
    "How can you share one insight in a simple way?"
  ],
  calming_practices: [
    "Short logic puzzles to calm the mind",
    "Walk-and-think sessions to test hypotheses",
    "Timed creative sprints (15–25 minutes)",
    "Focused audio (ambient / binaural) while reading"
  ],
  gentle_reads: [
    { title: "The Structure of Scientific Revolutions", author: "Thomas S. Kuhn" },
    { title: "How to Take Smart Notes", author: "Sönke Ahrens" },
    { title: "A Mind for Numbers", author: "Barbara Oakley" }
  ],

}

  },

  ENFP: {
    title: "The Campaigner",
    motto: "Follow curiosity — energy and connection unlock new paths.",
    strengths: [
      "Enthusiastic, creative, and socially engaging.",
      "Inspired by possibilities and new experiences.",
      "Able to motivate and connect people.",
    ],
    weaknesses: [
      "May scatter focus across many interests.",
      "Avoids boring routine and can under-plan.",
    ],
    growth:
      "ENFPs grow by pairing passion with structure — small habits channel creativity into outcomes.",
    growth_points: [
  "Use light routines to maintain momentum on creative projects.",
  "Stay grounded by finishing one idea before starting the next.",
  "Protect emotional health by prioritizing supportive relationships.",
  "Turn optimism into impact with weekly planning.",
],

      work_style:
      "Prefer dynamic, people-facing or creative roles that offer novelty.",
    relationship:
      "Warm, spontaneous partners who share curiosity and flexibility.",
    roles: [
      "Entrepreneur",
      "Creative Director",
      "Public Relations",
      "Coach / Facilitator",
    ],
    famous: [
      { name: "Robin Williams", img: "/src/assets/famous/ENFP/robin.jpg" },
      { name: "Walt Disney", img: "/src/assets/famous/ENFP/disney.jpg" },
      { name: "Salvador Dalí", img: "/src/assets/famous/ENFP/dali.jpg" },
      { name: "Anne Frank", img: "/src/assets/famous/ENFP/anne_frank.jpg" },
    ],

    therapy: {
  subtitle: "ENFPs thrive on novelty and meaning. Ground high energy with gentle structure and restorative practices.",
  guided_reflection: [
    "What project lights you up and why?",
    "Where do you need clearer boundaries to protect focus?",
    "What consistent habit would help your creativity thrive?",
    "Who inspires your most playful, productive self?"
  ],
  calming_practices: [
    "Creative play sessions (sketch, improv, music)",
    "Short daily routines to anchor mornings",
    "Nature walks with curiosity prompts",
    "Five-minute grounding breathing between tasks"
  ],
  gentle_reads: [
    { title: "Big Magic", author: "Elizabeth Gilbert" },
    { title: "The War of Art", author: "Steven Pressfield" },
    { title: "Show Your Work!", author: "Austin Kleon" }
  ],
 
}

  },

  ENFJ: {
    title: "The Protagonist",
    motto: "Lead by inspiring others — purpose + service builds influence.",
    strengths: [
      "Charismatic, empathetic, and excellent at mobilizing others.",
      "Strong interpersonal and leadership skills.",
    ],
    weaknesses: [
      "Can overextend trying to help everyone.",
      "May become upset when others don't follow their vision.",
    ],
    growth:
      "ENFJs flourish when balancing service with self-care and creating structures to support their goals.",
    growth_points: [
  "Avoid burnout by setting limits on how much you give.",
  "Delegate tasks instead of doing everything yourself.",
  "Allow others to express different opinions without feeling responsible.",
  "Protect personal time as much as community time.",
],

      work_style:
      "Thrive in leadership, coaching, policy, or community roles.",
    relationship:
      "Warm, supportive, and committed partners who value growth.",
    roles: [
      "Leader / Executive",
      "Teacher / Coach",
      "Community Organizer",
      "Counselor",
    ],
    famous: [
      { name: "Oprah Winfrey", img: "/src/assets/famous/ENFJ/oprah.jpg" },
      { name: "Nelson Mandela", img: "/src/assets/famous/ENFJ/mandela.jpg" },
      { name: "Emma Watson", img: "/src/assets/famous/ENFJ/emma_watson.jpg" },
      { name: "Harriet Tubman", img: "/src/assets/famous/ENFJ/tubman.jpg" },
    ],

    therapy: {
  subtitle: "ENFJs lead with empathy. Use this space to balance service with self-care and strategic boundaries.",
  guided_reflection: [
    "Which helping role energizes you most?",
    "Where do you need clearer boundaries to stay balanced?",
    "Who supports your own personal growth?",
    "What small daily practice restores your energy?"
  ],
  calming_practices: [
    "Brief mindful check-ins before meetings",
    "Guided relational journaling",
    "Short restorative yoga or stretching",
    "Scheduled down-time to reconnect with hobbies"
  ],
  gentle_reads: [
    { title: "Daring Greatly", author: "Brené Brown" },
    { title: "Radical Candor", author: "Kim Scott" },
    { title: "Give and Take", author: "Adam Grant" }
  ],

}

  },

  ENTP: {
    title: "The Debater",
    motto: "Challenge assumptions — innovation thrives in uncertainty.",
    strengths: [
      "Quick-witted, inventive, and energetic in debate.",
      "Sees new angles and opportunities rapidly.",
    ],
    weaknesses: [
      "Can argue for sport and be perceived as combative.",
      "May jump between ideas without finishing projects.",
    ],
    growth:
      "ENTPs are most effective when they partner with implementers and practice follow-through.",
    growth_points: [
  "Strengthen consistency by building simple routines.",
  "Practice active listening in debates to reduce friction.",
  "Choose 1–2 big goals instead of chasing many ideas.",
  "Use feedback loops to complete long-term projects.",
],

      work_style:
      "Prefer startups, consulting, design, and roles valuing strategic improvisation.",
    relationship:
      "Stimulating partners who enjoy intellectual sparring and freedom.",
    roles: [
      "Entrepreneur",
      "Innovator",
      "Consultant",
      "Product Strategist",
    ],
    famous: [
      { name: "Thomas Edison", img: "/src/assets/famous/ENTP/edison.jpg" },
      { name: "Mark Twain", img: "/src/assets/famous/ENTP/twain.jpg" },
      { name: "Niccolò Machiavelli", img: "/src/assets/famous/ENTP/machiavelli2.jpg" },
      { name: "Catherine the Great", img: "/src/assets/famous/ENTP/catherine.jpg" },
    ],

    therapy: {
  subtitle: "ENTPs love debate and exploration. Ground spontaneity with tiny commitments and practices that protect focus.",
  guided_reflection: [
    "Which idea excites you most right now and why?",
    "What small systems help you finish what you start?",
    "When were you most productively playful recently?",
    "How can you balance novelty with follow-through?"
  ],
  calming_practices: [
    "Short brainstorming sprints followed by a quiet walk",
    "Timed implementation sessions (25 minutes)",
    "Mindful transitions to close a creative session",
    "Breathwork to regulate high energy"
  ],
  gentle_reads: [
    { title: "The Innovator's Dilemma", author: "Clayton Christensen" },
    { title: "Mastery", author: "Robert Greene" },
    { title: "The Practice", author: "Seth Godin" }
  ],

}

  },

  ESTP: {
    title: "The Persuader",
    motto: "Act decisively, adapt quickly — the moment is your advantage.",
    strengths: [
      "Bold, action-oriented and excellent under pressure.",
      "A practical problem-solver who reads situations well.",
    ],
    weaknesses: [
      "May take excessive risks and neglect planning.",
      "Can be impatient with slow, theoretical discussion.",
    ],
    growth:
      "ESTPs thrive when they pair action with reflection and maintain supportive relationships.",
    growth_points: [
  "Slow down when making big life decisions.",
  "Consider long-term consequences before acting.",
  "Practice empathy in conversations to reduce conflict.",
  "Develop routines to support your rapid growth.",
],

      work_style:
      "Prefer fast-paced roles — sales, emergency services, events, athletics.",
    relationship:
      "Direct and thrilling partners who like excitement and spontaneity.",
    roles: [
      "Sales Manager",
      "Entrepreneur",
      "Pilot / Emergency Responder",
      "Athlete / Trainer",
    ],
    famous: [
      { name: "Ernest Hemingway", img: "/src/assets/famous/ESTP/hemingway.jpg" },
      { name: "Donald Trump", img: "/src/assets/famous/ESTP/trump.jpg" },
      { name: "Madonna", img: "/src/assets/famous/ESTP/madonna.jpg" },
      { name: "Bruce Willis", img: "/src/assets/famous/ESTP/willis.jpg" },
    ],

    therapy: {
  subtitle: "ESTPs are action-oriented and practical. Use hands-on practices and quick recovery rituals to stay resilient.",
  guided_reflection: [
    "What action gave you a clear win recently?",
    "How do you recover energy after high-pressure moments?",
    "Which routine helps you maintain peak performance?",
    "Where could a pause improve your decisions?"
  ],
  calming_practices: [
    "Short physical activity (10–15 min)",
    "Breath-focused grounding under pressure",
    "Practical problem-solving checklists",
    "Cold splash or brisk outdoor break"
  ],
  gentle_reads: [
    { title: "The Power of Habit", author: "Charles Duhigg" },
    { title: "Can't Hurt Me", author: "David Goggins" },
    { title: "Range", author: "David Epstein" }
  ],

}

  },

  ESFP: {
    title: "The Entertainer",
    motto: "Bring joy to the present — life’s best moments are shared.",
    strengths: [
      "Warm, vivacious and excellent at connecting with audiences.",
      "Lively, spontaneous, and fun-loving.",
    ],
    weaknesses: [
      "May avoid long-term plans and struggle with delayed rewards.",
      "Can become bored with routine tasks.",
    ],
    growth:
      "ESFPs bloom when channeling performance into meaningful craft and protecting time to rest.",
    growth_points: [
  "Build patience for long-term goals and delayed rewards.",
  "Create structure to support your spontaneous creativity.",
  "Practice managing finances and commitments proactively.",
  "Surround yourself with people who appreciate your warmth.",
],

      work_style:
      "Thrive in hospitality, performing arts, design, and people-facing roles.",
    relationship:
      "Open, affectionate, and playful partners who value spontaneity.",
    roles: [
      "Performer / Actor",
      "Event Planner",
      "Hospitality Manager",
      "Creative Producer",
    ],
    famous: [
      { name: "Marilyn Monroe", img: "/src/assets/famous/ESFP/monroe.jpg" },
      { name: "Justin Timberlake", img: "/src/assets/famous/ESFP/timberlake.jpg" },
      { name: "Elvis Presley", img: "/src/assets/famous/ESFP/elvis.jpg" },
      { name: "Beyoncé", img: "/src/assets/famous/ESFP/beyonce.jpg" },
    ],

    therapy: {
  subtitle: "ESFPs bring warmth and vivacity. Anchor your energy with creative practice and gentle boundaries to preserve joy.",
  guided_reflection: [
    "What experience made you feel most alive this month?",
    "How do you recharge after social energy spent?",
    "What creative outlet would you like to prioritize?",
    "Where would a small boundary improve your well-being?"
  ],
  calming_practices: [
    "Short dance or movement breaks",
    "Sensory-focused activities (cooking, art)",
    "Brief nature outings to reset",
    "Listening to mood-lifting playlists"
  ],
  gentle_reads: [
    { title: "The Gifts of Imperfection", author: "Brené Brown" },
    { title: "Big Magic", author: "Elizabeth Gilbert" },
    { title: "The Happiness Advantage", author: "Shawn Achor" }
  ],

}

  },

  ESTJ: {
    title: "The Executive",
    motto: "Lead with clarity and structure — systems amplify impact.",
    strengths: [
      "Organized, dependable, and excellent at execution.",
      "Strong at policy, logistics and managing people.",
    ],
    weaknesses: [
      "May be rigid or overly critical of deviations.",
      "Can undervalue softer emotional needs in teams.",
    ],
    growth:
      "ESTJs benefit from practicing empathy and flexibility while keeping strong processes.",
    growth_points: [
  "Develop patience and empathy in high-pressure situations.",
  "Practice flexibility when plans change.",
  "Listen fully before making decisions.",
  "Balance productivity with emotional awareness.",
],

      work_style:
      "Prefer managerial, operational or policy roles with clear metrics.",
    relationship:
      "Committed, responsible partners who value tradition and reliability.",
    roles: [
      "Operations Manager",
      "Project Manager",
      "Judge / Administrator",
      "Military Officer",
    ],
    famous: [
      { name: "Margaret Thatcher", img: "/src/assets/famous/ESTJ/thatcher.jpg" },
      { name: "Vince Lombardi", img: "/src/assets/famous/ESTJ/lombardi.jpg" },
      { name: "Sonia Sotomayor", img: "/src/assets/famous/ESTJ/sotomayor.jpg" },
      { name: "Henry Ford", img: "/src/assets/famous/ESTJ/ford.jpg" },
    ],

therapy: {
  subtitle: "ESTJs value order and results. Use therapy to build emotional flexibility and systems that support relationships.",
  guided_reflection: [
    "Which routine supports your efficiency and which drains you?",
    "Where could listening more deepen a relationship?",
    "What emotional need may be unmet right now?",
    "Which structure could free time for what matters?"
  ],
  calming_practices: [
    "Short strategic planning sessions",
    "Active physical movement to release stress",
    "Checklists for emotional and logistical tasks",
    "Brief reflective journaling at day’s end"
  ],
  gentle_reads: [
    { title: "Essentialism", author: "Greg McKeown" },
    { title: "Crucial Conversations", author: "Patterson et al." },
    { title: "Emotional Intelligence", author: "Daniel Goleman" }
  ],

}


  },

  ESFJ: {
    title: "The Consul",
    motto: "Serve with heart — strong communities are built by caring people.",
    strengths: [
      "Warm, socially aware and service-oriented.",
      "Skilled at organizing social support and details.",
    ],
    weaknesses: [
      "May be overly concerned about social approval.",
      "Can struggle with conflict and suppressed needs.",
    ],
    growth:
      "ESFJs thrive when they practice setting boundaries and focusing some attention inward.",
    growth_points: [
  "Focus on your needs without guilt.",
  "Avoid relying on external approval for confidence.",
  "Practice conflict-resolution instead of avoidance.",
  "Build independence by making decisions just for yourself.",
],

      work_style:
      "Prefer roles in social services, healthcare, teaching and hospitality.",
    relationship:
      "Attentive and devoted partners who prioritize family and connection.",
    roles: [
      "Nurse / Healthcare Coordinator",
      "Teacher",
      "Event or Community Manager",
      "HR Specialist",
    ],
    famous: [
      { name: "Taylor Swift", img: "/src/assets/famous/ESFJ/taylor.jpg" },
      { name: "Bill Clinton", img: "/src/assets/famous/ESFJ/clinton.jpg" },
      { name: "Barbara Walters", img: "/src/assets/famous/ESFJ/walters.jpg" },
      { name: "Jennifer Garner", img: "/src/assets/famous/ESFJ/garner.jpg" },
    ],
    therapy: {
  subtitle: "ESFJs are service-oriented and warm. Therapy helps balance caretaking with personal needs and clearer boundaries.",
  guided_reflection: [
    "Who do you serve that also supports your growth?",
    "When do you feel underappreciated and how can you express it?",
    "Which small ritual restores your energy?",
    "What boundary would keep you from overextending?"
  ],
  calming_practices: [
    "Gentle social time with close friends",
    "Practical self-care routines (sleep, meals)",
    "Short reflective journaling for emotional clarity",
    "Soothing sensory rituals (tea, calming music)"
  ],
  gentle_reads: [
    { title: "The Gifts of Imperfection", author: "Brené Brown" },
    { title: "Boundaries", author: "Henry Cloud & John Townsend" },
    { title: "Radical Acceptance", author: "Tara Brach" }
  ],

}

  },

  ISTP: {
    title: "The Virtuoso",
    motto: "Master tools, experiment boldly — practical skill transforms ideas.",
    strengths: [
      "Practical, hands-on and calm under pressure.",
      "Excellent at troubleshooting and improvisation.",
    ],
    weaknesses: [
      "Can be private and aloof; might avoid commitments.",
      "May neglect long-term planning.",
    ],
    growth:
      "ISTPs gain by committing to projects long enough to see results and by sharing process with others.",
    growth_points: [
  "Stay committed to long-term goals, not only immediate challenges.",
  "Communicate feelings openly instead of relying on independence.",
  "Plan ahead to avoid reactive decision-making.",
  "Share your process so others can understand your thinking.",
],

      work_style:
      "Prefer technical, hands-on roles — engineering, mechanics, sports.",
    relationship:
      "Low-maintenance but loyal; prefer partners who value freedom.",
    roles: [
      "Mechanic / Engineer",
      "Pilot",
      "Forensic Analyst",
      "Craftsman / Designer",
    ],
    famous: [
      { name: "Clint Eastwood", img: "/src/assets/famous/ISTP/eastwood.jpg" },
      { name: "Bear Grylls", img: "/src/assets/famous/ISTP/grylls.jpg" },
      { name: "Michael Jordan", img: "/src/assets/famous/ISTP/jordan.jpg" },
      { name: "Steve Jobs", img: "/src/assets/famous/ISTP/jobs.jpg" },
    ],
    therapy: {
  subtitle: "ISTPs are pragmatic and calm. Ground reflection in hands-on problem-solving and brief routines that prevent drift.",
  guided_reflection: [
    "What practical solution eased stress recently?",
    "When do you feel most purposeful and engaged?",
    "Which habit would improve daily functioning?",
    "What skill would you like to practice this month?"
  ],
  calming_practices: [
    "Short hands-on projects to focus energy",
    "Timed physical activity or skill practice",
    "Brief sensory resets (cold water, stretch)",
    "Minimalist journaling: three lines of reflection"
  ],
  gentle_reads: [
    { title: "Make Time", author: "Jake Knapp & John Zeratsky" },
    { title: "The Practicing Mind", author: "Thomas M. Sterner" },
    { title: "Peak", author: "Anders Ericsson" }
  ],

}

  },

  ISFP: {
    title: "The Adventurer",
    motto: "Create quietly and beautifully — live with sensory artistry.",
    strengths: [
      "Artistic, gentle, and highly attuned to aesthetics.",
      "Prefer to lead by example and to express through craft.",
    ],
    weaknesses: [
      "May avoid conflict and be too private.",
      "Can struggle with long-term planning and consistency.",
    ],
    growth:
      "ISFPs thrive by protecting creative time and by translating small rituals into sustainable practice.",
    growth_points: [
  "Create consistent creative habits to grow your craft.",
  "Speak up when boundaries are crossed.",
  "Embrace planning so your ideas can flourish.",
  "Explore collaboration without fear of losing authenticity.",
],

      work_style:
      "Prefer art, design, therapy, and roles with tangible, sensory outcomes.",
    relationship:
      "Warm, affectionate partners who express love through actions.",
    roles: [
      "Designer / Artist",
      "Chef / Culinary Artist",
      "Photographer",
      "Occupational Therapist",
    ],
    famous: [
      { name: "David Bowie", img: "/src/assets/famous/ISFP/bowie.jpg" },
      { name: "Brad Pitt", img: "/src/assets/famous/ISFP/pitt.jpg" },
      { name: "Frida Kahlo", img: "/src/assets/famous/ISFP/kahlo.jpg" },
      { name: "Rihanna", img: "/src/assets/famous/ISFP/rihanna.jpg" },
    ],
    therapy: {
  subtitle: "ISFPs are quietly artistic and sensitive. Protect creative time, practice gentle boundaries, and use sensory grounding.",
  guided_reflection: [
    "What sensory experiences nourish you most?",
    "When did you feel most authentically expressive?",
    "Which small ritual returns calm when life is noisy?",
    "What project would help you express a feeling?"
  ],
  calming_practices: [
    "Short creative sessions (art, cooking, music)",
    "Mindful sensory walks (pay attention to textures/sounds)",
    "Evening micro-rituals (tea, sketching)",
    "Slow breathing or progressive muscle relaxation"
  ],
  gentle_reads: [
    { title: "The War of Art", author: "Steven Pressfield" },
    { title: "Art & Fear", author: "David Bayles & Ted Orland" },
    { title: "The Practice", author: "Seth Godin" }
  ],

}

  },

  ISTJ: {
    title: "The Logistician",
    motto: "Do the work, honor the rules — reliability creates trust.",
    strengths: [
      "Dependable, thorough and detail-oriented.",
      "Excellent at following process and ensuring standards.",
    ],
    weaknesses: [
      "Can be resistant to change and overly rigid.",
      "May undervalue spontaneity and emotional nuance.",
    ],
    growth:
      "ISTJs flourish when they combine discipline with curiosity and when they delegate to avoid burnout.",
    growth_points: [
  "Be open to new ideas even when they challenge tradition.",
  "Communicate emotions instead of holding them in.",
  "Practice flexibility in unfamiliar situations.",
  "Seek collaboration instead of trying to carry everything alone.",
],

      work_style:
      "Prefer structured roles—accounting, law enforcement, administration.",
    relationship:
      "Loyal, steady partners who value predictability and commitment.",
    roles: [
      "Accountant",
      "Auditor",
      "Judge",
      "Police Officer / Inspector",
    ],
    famous: [
      { name: "Warren Buffett", img: "/src/assets/famous/ISTJ/buffett.jpg" },
      { name: "Angela Merkel", img: "/src/assets/famous/ISTJ/merkel.jpg" },
      { name: "George Washington", img: "/src/assets/famous/ISTJ/washington.jpg" },
      { name: "Queen Elizabeth II", img: "/src/assets/famous/ISTJ/queen_elizabeth.jpg" },
    ],
    therapy: {
  subtitle: "ISTJs value reliability and structure. Therapy can help tune emotional awareness into reliable daily routines.",
  guided_reflection: [
    "Which routine most supports your stability?",
    "What expectation creates stress and can be adjusted?",
    "Where could small flexibility improve relationships?",
    "How do you recharge after a busy stretch?"
  ],
  calming_practices: [
    "Structured wind-down routine each evening",
    "Short organized physical activity (walk, chores)",
    "Checklists to clear mental load",
    "Mindful breathing before starting work"
  ],
  gentle_reads: [
    { title: "Getting Things Done", author: "David Allen" },
    { title: "The Power of Habit", author: "Charles Duhigg" },
    { title: "Drive", author: "Daniel H. Pink" }
  ],

}

  },

  ISFJ: {
    title: "The Defender",
    motto: "Serve gently and reliably — small acts of care build strong worlds.",
    strengths: [
      "Responsible, compassionate and excellent at follow-through.",
      "Strong memory for details about people’s needs.",
    ],
    weaknesses: [
      "May avoid conflict and internalize stress.",
      "Can be overly self-sacrificing.",
    ],
    growth:
      "ISFJs feel fulfilled when they balance caring for others with self-care and clearer boundaries.",
    growth_points: [
  "Set healthy boundaries to avoid over-giving.",
  "Express your needs clearly and confidently.",
  "Let go of perfectionism in relationships and work.",
  "Take risks that push you out of your comfort zone.",
],

      work_style:
      "Thrive in healthcare, education, administration and caregiving roles.",
    relationship:
      "Steady, devoted partners prioritizing family and tradition.",
    roles: [
      "Nurse",
      "Teacher",
      "Social Worker",
      "Office Administrator",
    ],
    famous: [
      { name: "Beyoncé (also ESFP in some sources)", img: "/src/assets/famous/ISFJ/beyonce.jpg" },
      { name: "Rosa Parks", img: "/src/assets/famous/ISFJ/rosa_parks.jpg" },
      { name: "Kate Middleton", img: "/src/assets/famous/ISFJ/kate.jpg" },
      { name: "Mother Teresa", img: "/src/assets/famous/ISFJ/mother_teresa.jpg" },
    ],
    therapy: {
  subtitle: "ISFJs nurture others carefully. Build sustainable caregiving by protecting your needs and adding gentle replenishing rituals.",
  guided_reflection: [
    "Who benefits from your care and who supports you?",
    "What small act of self-care would make a big difference?",
    "Where do you need clearer boundaries to feel rested?",
    "What memory grounds you when you feel overwhelmed?"
  ],
  calming_practices: [
    "Short restorative routines (bath, warm drink)",
    "Organized rest blocks in your schedule",
    "Soothing music and soft lighting for decompression",
    "Gratitude journaling to notice small wins"
  ],
  gentle_reads: [
    { title: "Radical Acceptance", author: "Tara Brach" },
    { title: "The Book of Joy", author: "Dalai Lama & Desmond Tutu" },
    { title: "Self-Compassion", author: "Kristin Neff" }
  ],

}

  },

  ENTJ: {
    title: "The Commander",
    motto: "Lead with clarity and conviction — create systems that scale.",
    strengths: [
      "Decisive, strategic and excellent at organizing people.",
      "Confident at handling big-picture challenges.",
    ],
    weaknesses: [
      "Can be domineering or impatient with feelings.",
      "May undervalue collaborative consensus.",
    ],
    growth:
      "ENTJs benefit from listening practices and delegating empathy roles to balanced teammates.",
    growth_points: [
  "Practice empathy when communicating directives.",
  "Balance ambition with patience for team development.",
  "Delegate tasks instead of over-controlling outcomes.",
  "Take breaks to avoid burnout from overworking.",
],

      work_style:
      "Thrive in leadership, scaling businesses, strategy and politics.",
    relationship:
      "Strong, ambitious partners who value competence and mutual growth.",
    roles: [
      "CEO / Executive",
      "Strategy Consultant",
      "Lawyer",
      "Senior Politician",
    ],
    famous: [
      { name: "Margaret Thatcher (also ESTJ in some lists)", img: "/src/assets/famous/ENTJ/thatcher2.jpg" },
      { name: "Franklin D. Roosevelt", img: "/src/assets/famous/ENTJ/fdr.jpg" },
      { name: "Napoleon Bonaparte", img: "/src/assets/famous/ENTJ/napoleon.jpg" },
      { name: "Sheryl Sandberg", img: "/src/assets/famous/ENTJ/sheryl.jpg" },
    ],
  },
therapy: {
  subtitle: "ENTJs lead with vision. Use therapy to develop emotional intelligence that scales alongside your strategic strengths.",
  guided_reflection: [
    "What long-term legacy are you building?",
    "Which feedback is hardest to hear and why?",
    "Where could listening more improve outcomes?",
    "What small practice would increase team well-being?"
  ],
  calming_practices: [
    "Short strategic breathing or walking breaks",
    "Focused 'reset' rituals after meetings",
    "Micro meditations to lower reactivity",
    "Physical exercise to clear tension"
  ],
  gentle_reads: [
    { title: "Principles", author: "Ray Dalio" },
    { title: "Leaders Eat Last", author: "Simon Sinek" },
    { title: "Emotional Intelligence", author: "Daniel Goleman" }
  ],

}


};

// --- auto-resolve local asset strings into real URLs (Vite) ---
// Import every image under src/assets/famous and map them to keys like "INFP/princess_diana".
// Using import.meta.glob with { eager: true, as: "url" } returns URL strings directly.
const imports = import.meta.glob("../assets/famous/**/*.{jpg,png,webp}", {
  eager: true,
  as: "url",
});

const IMG_MAP = Object.fromEntries(
  Object.entries(imports).map(([filePath, url]) => {
    // filePath example: "../assets/famous/INFP/princess_diana.jpg"
    const key = filePath
      .replace("../assets/famous/", "") // -> "INFP/princess_diana.jpg"
      .replace(/\.(jpg|png|webp)$/i, ""); // -> "INFP/princess_diana"
    return [key, url]; // value is the resolved URL string (thanks to as: "url")
  })
);
// ------------------ ADD THESE LOGS ------------------
console.log("IMG_MAP keys:", Object.keys(IMG_MAP).slice(0, 40));
console.log('IMG_MAP sample for "INFP/princess_diana":', IMG_MAP["INFP/princess_diana"]);
// ---------------------------------------------------

function resolveImagePaths(obj) {
  // deep clone to avoid mutating original
  const copy = JSON.parse(JSON.stringify(obj));

  function walk(node) {
    if (!node || typeof node !== "object") return;
    for (const k of Object.keys(node)) {
      const val = node[k];
      if (typeof val === "string") {
        // match strings like "/src/assets/famous/INFP/princess_diana.jpg"
        const m = val.match(/^\/?src\/assets\/famous\/(.+?)\.(jpg|png|webp)$/i);
        if (m) {
          const mapKey = m[1]; // e.g. "INFP/princess_diana"
          node[k] = IMG_MAP[mapKey] || val; // replace with resolved URL or keep original as fallback
        }
      } else if (Array.isArray(val)) {
        val.forEach((item) => {
          walk(item);
        });
      } else if (typeof val === "object") {
        walk(val);
      }
    }
  }

  walk(copy);
  return copy;
}

// Create a resolved copy and export that instead of the raw object
const PERSONALITY_FULL_RESOLVED = resolveImagePaths(PERSONALITY_FULL);
export default PERSONALITY_FULL_RESOLVED;

