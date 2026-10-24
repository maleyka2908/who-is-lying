export const cases = [
  {
    id: "case-001",
    title: "The Missing Diamond",
    difficulty: "Easy",
    description: "A valuable diamond disappeared during a private museum event.",

    incident: {
      location: "Royal Museum",
      date: "2026-10-15",
      time: "21:00",
      details: "During a short power outage, a valuable diamond disappeared from a locked display case. Four people were near the exhibition room."
    },

    suspects: [
      {
        id: "s1",
        name: "Emma Wilson",
        role: "Museum Curator",
        motive: "She was under financial pressure.",
        alibi: "I was in my office preparing documents from 20:45 to 21:15.",
        statement: "I did not leave my office during the power outage."
      },
      {
        id: "s2",
        name: "James Carter",
        role: "Security Guard",
        motive: "He recently received a warning at work.",
        alibi: "I was checking the security cameras in the control room.",
        statement: "The cameras stopped recording when the power went out."
      },
      {
        id: "s3",
        name: "Sophia Brown",
        role: "Event Organizer",
        motive: "She wanted money to save her business.",
        alibi: "I was speaking with guests in the main hall.",
        statement: "Several guests can confirm I was with them."
      },
      {
        id: "s4",
        name: "Daniel Reed",
        role: "Museum Technician",
        motive: "He knew how to disable the alarm system.",
        alibi: "I was repairing equipment in the basement.",
        statement: "I never entered the exhibition room that evening."
      }
    ],

    messages: [
      {
        id: "m1",
        sender: "Emma Wilson",
        receiver: "Sophia Brown",
        time: "20:50",
        text: "I will be in my office until the event ends."
      },
      {
        id: "m2",
        sender: "James Carter",
        receiver: "Daniel Reed",
        time: "20:55",
        text: "The exhibition room alarm is showing an error."
      },
      {
        id: "m3",
        sender: "Daniel Reed",
        receiver: "James Carter",
        time: "20:57",
        text: "I will check the electrical panel in the basement."
      },
      {
        id: "m4",
        sender: "Sophia Brown",
        receiver: "Emma Wilson",
        time: "21:08",
        text: "Where are you? We need you in the main hall."
      }
    ],

    timeline: [
      { time: "20:45", event: "The museum event begins." },
      { time: "20:55", event: "The exhibition alarm reports an error." },
      { time: "21:00", event: "A power outage affects the museum." },
      { time: "21:03", event: "The exhibition door access log records Daniel's card." },
      { time: "21:05", event: "Electricity is restored." },
      { time: "21:10", event: "The diamond is discovered missing." }
    ],

    clues: [
      {
        id: "c1",
        title: "Door Access Log",
        type: "document",
        description: "Daniel Reed's access card opened the exhibition room at 21:03."
      },
      {
        id: "c2",
        title: "Basement Camera",
        type: "video",
        description: "The basement camera shows Daniel leaving at 20:58 and returning at 21:07."
      },
      {
        id: "c3",
        title: "Alarm Maintenance Record",
        type: "document",
        description: "Daniel had permission to inspect the alarm system before the event."
      },
      {
        id: "c4",
        title: "Guest Testimony",
        type: "witness",
        description: "Two guests confirm Sophia was in the main hall at 21:00."
      }
    ],

    hints: [
      "Check the exhibition room access records.",
      "Compare the basement camera footage with the suspects' alibis.",
      "One suspect claims they never entered the exhibition room."
    ],

    solution: {
      liarId: "s4",
      liarName: "Daniel Reed",
      explanation: "Daniel claimed he never entered the exhibition room. However, his access card opened the door at 21:03, and the basement camera shows he was away from his claimed location. He lied about his whereabouts. The evidence makes him the main suspect, although it does not independently prove he stole the diamond."
    }
  },

  {
    id: "case-002",
    title: "The Stolen Exam",
    difficulty: "Medium",
    description: "A confidential exam paper was leaked before the final test.",

    incident: {
      location: "Westbridge Academy",
      date: "2026-10-18",
      time: "18:30",
      details: "A confidential exam paper was copied from the school office. Four people had possible access to the building."
    },

    suspects: [
      {
        id: "s1",
        name: "Olivia Green",
        role: "Student",
        motive: "She needed a high grade to keep her scholarship.",
        alibi: "I was studying in the library until 19:00.",
        statement: "I never entered the teachers' office."
      },
      {
        id: "s2",
        name: "Noah Blake",
        role: "Teaching Assistant",
        motive: "He was upset about losing a promotion.",
        alibi: "I was printing worksheets in the copy room.",
        statement: "I did not access the exam folder."
      },
      {
        id: "s3",
        name: "Mia Roberts",
        role: "Teacher",
        motive: "She wanted the exam postponed.",
        alibi: "I left the school at 18:00.",
        statement: "I was already at home when the file was copied."
      },
      {
        id: "s4",
        name: "Ethan Brooks",
        role: "IT Assistant",
        motive: "He had access to the school network.",
        alibi: "I was fixing a network issue in the server room.",
        statement: "I only accessed the server dashboard."
      }
    ],

    messages: [
      {
        id: "m1",
        sender: "Olivia Green",
        receiver: "Mia Roberts",
        time: "17:40",
        text: "Will the final exam still happen tomorrow?"
      },
      {
        id: "m2",
        sender: "Noah Blake",
        receiver: "Ethan Brooks",
        time: "18:10",
        text: "The office printer is not connecting."
      },
      {
        id: "m3",
        sender: "Mia Roberts",
        receiver: "School Reception",
        time: "18:05",
        text: "I have left for the day. See you tomorrow."
      },
      {
        id: "m4",
        sender: "Ethan Brooks",
        receiver: "Noah Blake",
        time: "18:20",
        text: "The network is working again."
      }
    ],

    timeline: [
      { time: "18:00", event: "Mia reports leaving the school." },
      { time: "18:10", event: "A printer connection issue is reported." },
      { time: "18:20", event: "The network connection is restored." },
      { time: "18:27", event: "The confidential exam file is opened using Noah's account." },
      { time: "18:30", event: "The exam file is copied to a USB device." },
      { time: "19:00", event: "The school office is locked." }
    ],

    clues: [
      {
        id: "c1",
        title: "Computer Login Record",
        type: "document",
        description: "Noah's account accessed the confidential exam folder at 18:27."
      },
      {
        id: "c2",
        title: "USB Connection Log",
        type: "document",
        description: "A USB device was connected to Noah's workstation at 18:30."
      },
      {
        id: "c3",
        title: "Copy Room Camera",
        type: "video",
        description: "The camera shows Noah at his workstation between 18:25 and 18:35."
      },
      {
        id: "c4",
        title: "Library Attendance",
        type: "document",
        description: "Olivia's library attendance is recorded from 18:00 to 19:00."
      }
    ],

    hints: [
      "Look at the computer login records.",
      "Find out which workstation was used at 18:30.",
      "Compare the USB log with the suspect statements."
    ],

    solution: {
      liarId: "s2",
      liarName: "Noah Blake",
      explanation: "Noah denied accessing the exam folder, but the login record shows his account opened it. The USB log and camera footage also connect his workstation to the copying event. The evidence strongly contradicts his statement."
    }
  }
];
