import { BriefcaseBusinessIcon, Calendar, Code2Icon, Component, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    name: 'All Interview',
    icon: List,
    path: '/all-interview'
  },
  {
    name: 'Interview Responses',
    icon: Calendar,
    path: '/interview-responses'
  },
  {
    name: 'Scheduled Calls',
    icon: WalletCards,
    path: '/scheduled-calls'
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings'
  }
]

export const InterviewType = [
  {
    title: 'Technical',
    icon: Code2Icon
  },
  {
    title: 'Behavioral',
    icon: User2Icon
  },
  {
    title: 'Experience',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Problem Solving',
    icon: Puzzle
  },
  {
    title: 'Leadership',
    icon: Component
  },
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions **and return ONLY a JSON array**.

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}   // e.g., "Behavioral, Problem Solving, Technical, Experience, Leadership"

Instructions:
- Identify responsibilities, required skills, and relevant experience.
- Generate interview questions based on the specified {{type}}. Each question should correspond to one of the following types: 
  - "Behavioral"
  - "Problem Solving"
  - "Technical"
  - "Experience"
  - "Leadership"
- Ensure question type matches a real-life {{type}} interview. 
- Make sure to respect the selected interview type(s).
- Format STRICTLY as raw JSON array (do NOT include any explanation).

Example format:
[
  {
    "question": "Describe your experience with React.",
    "type": "Technical"
  },
  {
    "question": "Tell me about a challenge you overcame in a team setting.",
    "type": "Behavioral"
  }
]

Return ONLY the array. Strictly Do not include any introduction, conclusion, or extra text.`

export const FEEDBACK_PROMPT = `
{{conversation}}
You are evaluating a job candidate's performance for the position of **{{jobTitle}}** based on the above interview.
Evaluate the user's performance **only if they actively participated** in the interview. 
If the user did not answer or answered very few questions, give **low or zero** scores. 
Take into account both the quality and quantity of responses. 
If there are no clear answers from the user, assign a technical skills score of 0 and mention that in the summary.
Avoid giving only praise or only criticism.
Highlight both positives and negatives clearly.

- If only two answers were provided, give lower scores for technical skills and problem solving.
- If the user did not engage well, reduce their communication and experience scores accordingly.
- The summary should note if the user didn’t respond to many questions or had weak answers.


Depends on this Interview {{conversation}} between assistant and user,
Give me feedback for the user interview. 
Give me rating out of 10 for technical Skills, Communication, Problem Solving, and Experience. 
Also give me a summary in 3 lines about the interview and one line to let me know whether they are recommended for hire or not, with a message. 
Give me the response in STRICT JSON format.

If don't have any conversation from user side give 0 rating in all and recommendation should be false 
If there are less conversation from user or not answered question give them low marks no need to give rating high even if user is not giving correct answer

Do not include any introduction, conclusion, or extra text.
I DONT WANT ANYTHING IN STARTING LIKE HERE IS THE FEEDBACK IN JSON FORMAT
I WANT AN JSON FILE ONLY NOTHING ELSE
{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7,
      "overallRating": 5.5
    },
    "summary": "<in 3 lines>",
    "Recommendation": "<true/false>",
    "RecommendationMsg": "<Recommendation message>"
  }
}
`

