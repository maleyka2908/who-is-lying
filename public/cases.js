window.WYL_CASES = [
  {
    "id": "001",
    "title": "The Vanishing Necklace",
    "difficulty": "Easy",
    "incident": "At 21:30, a valuable necklace disappeared from a gallery reception. Four people claim they were elsewhere.",
    "culprit": "maya",
    "suspects": [
      {
        "id": "maya",
        "name": "Maya Stone",
        "role": "Café manager",
        "statement": "I stayed at the café until 22:00. I never visited the gallery."
      },
      {
        "id": "leo",
        "name": "Leo Park",
        "role": "Security guard",
        "statement": "I was monitoring the east entrance between 21:00 and 22:00."
      },
      {
        "id": "nina",
        "name": "Nina Vale",
        "role": "Photographer",
        "statement": "I photographed the stage until 21:45."
      },
      {
        "id": "omar",
        "name": "Omar Reed",
        "role": "Event coordinator",
        "statement": "I was with the caterers at 21:30."
      }
    ],
    "evidence": [
      {
        "id": "e1",
        "type": "Location",
        "title": "Phone location history",
        "detail": "Maya’s phone connected to the gallery Wi-Fi at 21:27."
      },
      {
        "id": "e2",
        "type": "Camera",
        "title": "East entrance recording",
        "detail": "Leo is visible at his post from 21:20 to 21:42."
      },
      {
        "id": "e3",
        "type": "Photo",
        "title": "Stage photograph",
        "detail": "Nina’s camera metadata confirms a photo taken at 21:33."
      },
      {
        "id": "e4",
        "type": "Witness",
        "title": "Caterer statement",
        "detail": "Omar was seen in the kitchen at 21:31."
      }
    ],
    "timeline": [
      {
        "time": "21:20",
        "event": "Leo appears on the east entrance camera."
      },
      {
        "time": "21:27",
        "event": "Maya’s phone connects to gallery Wi-Fi."
      },
      {
        "time": "21:30",
        "event": "The necklace is reported missing."
      },
      {
        "time": "21:31",
        "event": "Omar is seen with caterers."
      },
      {
        "time": "21:33",
        "event": "Nina takes a stage photograph."
      }
    ],
    "messages": [
      {
        "from": "Maya → Nina",
        "time": "21:16",
        "text": "I’m staying at the café tonight. See you tomorrow."
      },
      {
        "from": "Omar → Leo",
        "time": "21:34",
        "text": "Please check the display case; the necklace is gone."
      }
    ],
    "explanation": "Maya claimed she never visited the gallery, but her phone connected to its Wi-Fi at 21:27. The other suspects have supporting evidence for their alibis."
  },
  {
    "id": "002",
    "title": "The Midnight Upload",
    "difficulty": "Medium",
    "incident": "At 00:15, a confidential design was uploaded from a shared studio computer. Who lied about their whereabouts?",
    "culprit": "iris",
    "suspects": [
      {
        "id": "iris",
        "name": "Iris Chen",
        "role": "Designer",
        "statement": "I left at 23:40 and never returned."
      },
      {
        "id": "ben",
        "name": "Ben Ortiz",
        "role": "Developer",
        "statement": "I worked remotely from home all night."
      },
      {
        "id": "sara",
        "name": "Sara Bloom",
        "role": "Producer",
        "statement": "I was in a video call at midnight."
      },
      {
        "id": "noah",
        "name": "Noah Ellis",
        "role": "Intern",
        "statement": "I locked the office at 00:25."
      }
    ],
    "evidence": [
      {
        "id": "e1",
        "type": "Access",
        "title": "Badge log",
        "detail": "Iris’s badge opened the studio door at 00:08."
      },
      {
        "id": "e2",
        "type": "Network",
        "title": "Home VPN log",
        "detail": "Ben’s home VPN session ran continuously from 23:55 to 00:30."
      },
      {
        "id": "e3",
        "type": "Call",
        "title": "Meeting attendance",
        "detail": "Sara was speaking in a recorded call at 00:14."
      },
      {
        "id": "e4",
        "type": "Access",
        "title": "Exit sensor",
        "detail": "Noah’s badge locked the studio at 00:25."
      }
    ],
    "timeline": [
      {
        "time": "23:40",
        "event": "Iris claims to leave."
      },
      {
        "time": "23:55",
        "event": "Ben starts home VPN session."
      },
      {
        "time": "00:08",
        "event": "Iris’s badge opens studio."
      },
      {
        "time": "00:15",
        "event": "Confidential upload takes place."
      },
      {
        "time": "00:25",
        "event": "Noah locks studio."
      }
    ],
    "messages": [
      {
        "from": "Iris → Sara",
        "time": "23:41",
        "text": "Heading home now. I won’t be back tonight."
      },
      {
        "from": "Noah → Team",
        "time": "00:26",
        "text": "Office locked, see you tomorrow."
      }
    ],
    "explanation": "The access log contradicts Iris’s claim: her badge opened the studio at 00:08, shortly before the upload."
  },
  {
    "id": "003",
    "title": "The Missing Prototype",
    "difficulty": "Hard",
    "incident": "A prototype vanished from a locked workshop at 18:10. Only one witness’s account conflicts with the combined timeline.",
    "culprit": "evan",
    "suspects": [
      {
        "id": "evan",
        "name": "Evan Cole",
        "role": "Engineer",
        "statement": "I was in the lab from 18:00 to 18:30, and I did not enter storage."
      },
      {
        "id": "ada",
        "name": "Ada Brooks",
        "role": "Researcher",
        "statement": "I joined the conference call at 18:05."
      },
      {
        "id": "kai",
        "name": "Kai Morgan",
        "role": "Technician",
        "statement": "I inspected the loading bay at 18:10."
      },
      {
        "id": "ruth",
        "name": "Ruth Hale",
        "role": "Supervisor",
        "statement": "I checked the inventory system at 18:12."
      }
    ],
    "evidence": [
      {
        "id": "e1",
        "type": "Sensor",
        "title": "Storage door sensor",
        "detail": "Storage door opened at 18:07 with Evan’s access credential."
      },
      {
        "id": "e2",
        "type": "Call",
        "title": "Conference log",
        "detail": "Ada joined a conference call at 18:05 and stayed until 18:25."
      },
      {
        "id": "e3",
        "type": "Camera",
        "title": "Loading bay camera",
        "detail": "Kai is visible at the loading bay at 18:10."
      },
      {
        "id": "e4",
        "type": "Audit",
        "title": "Inventory audit trail",
        "detail": "Ruth queried inventory from her office workstation at 18:12."
      }
    ],
    "timeline": [
      {
        "time": "18:05",
        "event": "Ada joins conference call."
      },
      {
        "time": "18:07",
        "event": "Evan’s credential opens storage."
      },
      {
        "time": "18:10",
        "event": "Prototype is found missing; Kai is at loading bay."
      },
      {
        "time": "18:12",
        "event": "Ruth queries inventory."
      }
    ],
    "messages": [
      {
        "from": "Evan → Ruth",
        "time": "18:02",
        "text": "I’ll stay in the lab. No need to check storage."
      },
      {
        "from": "Ruth → Team",
        "time": "18:13",
        "text": "Inventory count is short by one prototype."
      }
    ],
    "explanation": "Evan denied entering storage, but the door sensor records his credential at 18:07. This directly contradicts his statement."
  }
];
