import React, { useEffect, useState, useRef  } from 'react'
import Cards from '../Components/Cards'
import Navbar from '../Components/Navbar';
import axios from "axios";
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stops observing after triggering
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};
const MainPage = () => {
    const [showModals, setShowModals] = useState(false);
    const [formData, setFormData] = useState({
      teamName: "",
      leaderName: "",
      email: "",
      uid: "",
      phoneNumber: "",
      department: "",
      gender: "",
      password:"",
    });
    
    const [ref, isVisible] = useInView();
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedFormData = {
        ...formData,
        uid: formData.uid.toUpperCase(),
      };
    
      try {
        const response = await axios.post("http://localhost:3001/api/teams", updatedFormData);
        alert(response.data.message);
      } catch (error) {
        console.error("Error submitting form", error);
        alert(error.response?.data?.message || "Error occurred");
      }
    };
  
    const faqs = [
        {
            question: "Who can participate in the Dynamic Hackathon?",
            answer: "Students from Higher Education Institutes such as engineering colleges and universities can participate in the hackathon.",
          },
          {
            question: "How does one form a team?",
            answer: `- All participants must be from the same college or school; inter-college/school teams are not permitted.
            - Members from different branches or disciplines within the same institution may form a team.  
            - Each team must comprise a minimum of 2 students and a maximum of 6 students.  
            - Multi-disciplinary teams are encouraged, consisting of Computer Engineers, Mechanical Engineers, Electronic Engineers, Product Designers, Programmers, etc.`,
          },
          {
            question: "How to register for the Dynamic Hackathon?",
            answer: `**Option 1:** Colleges can register through Teachers/Professors (SPOCs). The SPOC can create student teams to solve problem statements.  
            **Option 2:** Students can register their teams directly. The team leader must register & select the designation as 'Team Leader' on the portal.`,
          },
          {
            question: "Can PhD students participate?",
            answer: "Yes, students pursuing PhD can participate in the hackathon.",
          },
          {
            question: "How should the teams come up with ideas? How are the ideas to be submitted?",
            answer: `- 10 problem statements are shared on the website and brochure. Teams can select any statement.  
            - One wild card entry is available for Out Of The Box Solutions.  
            - Teams can submit multiple ideas, but if selected for finals, they can only participate in one.  
            - Idea submission must be done on the portal.`,
          },
          {
            question: "What is the selection criteria?",
            answer: `Ideas will be evaluated based on:  
            - Novelty of the idea  
            - Complexity & clarity  
            - Feasibility & sustainability  
            - Scale of impact & creativity  
            - User experience & simplicity  
            - Potential for future progression`,
          },
          {
            question: "How would the students receive event updates?",
            answer: `- All updates will be available on the website and sent via email.  
            - It is recommended to regularly check the i4C website and add support@i4c.in to avoid emails going to Spam/Junk.`,
          },
          {
            question: "Will the hackathon be online or in-person?",
            answer: "The grand finale may be online or in-person, depending on circumstances. Selected teams will be notified beforehand.",
          },
          {
            question: "What are the prizes to be won?",
            answer: `- Prize details will be mentioned on the landing page and brochure.  
            - If there is a tie, the final decision will be taken by the event organizers.  
            - Organizers may withhold prizes if no idea is satisfactory.  
            - Winning team members will receive certificates.  
            - All participants submitting ideas receive a Participation Certificate.  
            - Finalists will receive a Finale Certificate.`,
          },
      ];
        const [openIndex, setOpenIndex] = useState(null);
      
        const toggleFAQ = (index) => {
          setOpenIndex(openIndex === index ? null : index);
        };
      
  return (
    <div>
      
      <Navbar />
        <div className='divisionss'>
      <div className='homepage'>
    <img className='back' src='/Back.png' alt='back' />
    <img src='/Front.png' alt='front' className='front' />
      </div>
      <div className='contentss'>
        <div className='big'>
        Dynamic Hackathon
        </div>
        <div className='mediums'>
        Internal Hackathon 2025
        </div>
        <div>
        <button className="register" onClick={() => setShowModals(true)}>Register Now</button></div>
      </div>
      </div>
      {showModals && (
        <div className="overlay" onClick={() => setShowModals(false)}>
          <div className="modals" onClick={(e) => e.stopPropagation()}>
            <div className='division'>
                <div className='Registertext'>Registration</div>
                <div className='guidlines'>
                    <div>Guidlines</div>
                </div>
            <div className='loginoverlay'>
            <h2>Register for the Hackathon</h2>
            <form onSubmit={handleSubmit}>
      <input type="text" name="teamName" placeholder="Team Name" value={formData.teamName} onChange={handleChange} required />
      <input type="text" name="leaderName" placeholder="Leader's Name" value={formData.leaderName} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="uid" placeholder="UID" value={formData.uid} onChange={handleChange} required />
      <input type="number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
      <div className="department">
        <input type="text" name="department" placeholder="Department" className='dep' value={formData.department} onChange={handleChange} required />
        <select name="gender" value={formData.gender} className='gender-select' onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      <button className="submit-btns" type="submit">Submit</button>
    </form>
            </div></div>
          </div>
          <button className="close-btn" onClick={() => setShowModals(false)}>
              x
            </button>
        </div>
      )}
      <div className='division'>
        <div className={`content ${isVisible ? "animate" : ""}`} ref={ref}>
            <div className='medium'>About Hackathon</div>
            <p>Dynamic Hackathon is an exciting platform designed to ignite
innovation and tackle real-world challenges in crane safety,
heavy machinery operations, and industrial automation.
Organized by Dynamic Crane Engineers Pvt. Ltd. in collaboration
with i4C, this hackathon brings together students, developers,
and technology enthusiasts to build impactful solutions using
cutting-edge technologies like IoT, AI/MI, LIDAR, and data
analytics, embedded electronics, etc.</p><p>
Participants will have the opportunity to solve industry-specific
problems, gain mentorship from experts, and showcase their
technical and creative abilities. With a focus on improving safety,
efficiency, and predictive analytics in industrial operations,
Dynamic Hackathon serves as a launchpad for breakthrough
ideas and industry advancements.</p>
        </div>
        <div className='content'>
        <img src='/About.png' alt='about' className='aboutimage' />
        </div>
      </div>
      <div className='division'>
        <div className='content'>
            <img src='/robot.png' className='why' alt='robo' />
        </div>
        <div className='content'>
            <div className='medium'>Why Join Dynamic Hackathon?</div>
            <p>
                <ul>
                    <li><strong>Solve Real-World Problems -</strong> Tackle critical safety and
efficiency issues in crane operations.</li>
<li>
<strong>Showcase Your Skills -</strong> Demonstrate expertise in AI, IoT, and
LIDAR technologies.</li><li>
<strong>Win Rewards & Recognition -</strong> Attractive cash prizes,
certificates, and awards for outstanding innovations.</li><li>
<strong>Industry Exposure -</strong> Collaborate with top industry experts
and mentors.</li><li>
<strong>Career Growth -</strong> Enhance your resume and gain visibility
among recruiters.</li></ul>
</p><p>
Get ready to innovate, compete, and create solutions that
redefine the future of crane safety and material
handling systems.</p>
        </div>
      </div>
      <div className='adjust'>
      <div className='medium'>Timeline</div>
      </div>
      <div className='division'>
        <div className='timeline'>
        <img src='/timeline.png' alt='timeline' className='timelineimage' />
        </div>
        <div className='timelinecontainer'>
            <div>
        <div className='timeline1'><p>Launch of the Hackathon
            <br />
            17-Jan-25</p></div>
        <div className='timeline2'><p>Registration & Idea
        Submission Open<br />17-Jan-25</p></div>
        </div><div className='make'>
        <div className='timeline1'><p>Interactive Sessions
        (Webinars)<br />20-Jan-25 to 10 Feb-25</p></div>
        <div className='timeline2'><p>Registration & idea
        submission Close<br />20-Feb-25</p></div>
        </div>
        <div className='make'>
        <div className='timeline1'><p>Pre finale Evaluation
        Round<br />21-Feb-25 to 27-Feb-25</p></div>
        <div className='timeline2'><p>Announcement of
        Shortlisted teams<br />28-Feb-25</p></div>
        </div>
        <div className='make'>
        <div className='timeline1'><p>Mentoring
        Sessions<br />3-Mar-25 to 15-Mar-25</p></div>
        <div className='timeline2'><p>Grand Finale (The Demo Day)<br />21-Mar-25</p></div>
        </div>
        </div>
      </div>
      <div>
      <div className='adjust'>
      <div className='medium'>Problem Statement</div>
      </div>
        <Cards />
      </div>
      <div className='divisionss'>
      <div className='contentss'>
        <div className='medals'><img src='/medalfirst.png' alt='timeline' /> Winner <br />₹1,00,000</div>
        <div className='medals'><div className='medals'><img src='/medalsecond.png' alt='timeline' />1st Runner-Up <br />₹75000</div><div className='medals'><img src='/medalthird.png' alt='timeline' />2nd Runner-Up <br />₹50000</div></div>
      </div>
      <div className='contentss'>
      <table>
        <tr>
            <th>Award Category</th>
            <th>Prize Amount (INR)</th>
        </tr>
        <tr>
            <td>BEST DEMONSTRATION AWARD</td>
            <td>30,000</td>
        </tr>
        <tr>
            <td>BEST PRESENTATION AWARD (2ND RUNNER-UP)</td>
            <td>15,000</td>
        </tr>
        <tr>
            <td>INNOVATIVE IDEA</td>
            <td>30,000</td>
        </tr>
        <tr>
            <td>BEST GIRLS TEAM</td>
            <td>30,000</td>
        </tr>
        <tr>
            <td>BEST SPOC AWARD-1 (HIGHEST NUMBER OF TEAM REGISTRATIONS & IDEA SUBMISSION)</td>
            <td>25,000</td>
        </tr>
        <tr>
            <td>BEST SPOC AWARD-2 (2ND HIGHEST NUMBER OF TEAM REGISTRATIONS & IDEA SUBMISSION)</td>
            <td>15,000</td>
        </tr>
        <tr>
            <td>CENTER OF EXCELLENCE AWARD FOR COLLEGE WITH HIGHEST NUMBER OF TEAM REGISTRATIONS AND IDEA SUBMISSION</td>
            <td>30,000</td>
        </tr>
    </table>
      </div>
      </div>
      <div className='making'>
      <div className='division'>
        <div className='content'>
          <img src='/miscellanious.png' alt='miscellanious' className='miscellanious' />
        </div>
<div className='content'>
  <div className='medium'>Miscellaneous
  Information</div>
  <p>
  <ul>
    <li>Intellectual property (IP) of all submitted ideas shall lie with
    the student innovators.</li>
    <li>If the ideas are selected for further development support, IP
sharing would be applicable, and details will be decided upon
and formalized accordingly.</li>
<li>The ideas or solutions provided/developed/proposed by the
team must be new and must not have been present in any
previous event/program of any sort. Any IP infringement will
not be tolerated and will be dealt with seriously</li>
  </ul></p>
  <p>
About Dynamic Crane Engineers Pvt.Ltd.
Dynamic Crane Engineers Pvt. Ltd., established in 2001, is a
leading provider of premium crane safety systems and solutions
in India. With expertise in telescopic, lattice boom, offshore
cranes, and more, the company offers advanced electronic
systems like load indicators and wind speed monitors. Backed
by a technical team with over 35 years of combined experience,
Dynamic also specializes in JCB construction equipment trading
and innovative electric scissor lifts. Additionally, they provide
rental services for construction lifts, man & material hoists, and
AWPs to ensure safety and efficiency on job sites. Dynamic
remains a trusted partner for empowering safe and efficient
construction operations.</p>

</div>
      </div>
      </div>
      <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </button>
          {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
        </div>
      ))}
    </div>
      <div className='footer'>
      </div>
    </div>
  )
}

export default MainPage
