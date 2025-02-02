document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inputs') as HTMLFormElement;
  const displayform = document.getElementById('display') as HTMLDivElement;
  const shareableLinkContainer = document.getElementById("sharable-link") as HTMLDivElement;
  const shareableLinkElement = document.getElementById('share-link') as HTMLAnchorElement;
  const downloadPdfButton = document.getElementById('download') as HTMLButtonElement;

  if (!form || !displayform) {
    console.error('Required elements not found');
    return;
  }

  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();
    console.log('Form submitted'); // Debug log

    try {
      // Get form elements
      const username = (document.getElementById('username') as HTMLInputElement)?.value;
      const name = (document.getElementById("fullname") as HTMLInputElement)?.value;
      const email = (document.getElementById("email") as HTMLInputElement)?.value;
      const birth = (document.getElementById("birth") as HTMLInputElement)?.value;
      const gender = (document.getElementById("gender") as HTMLInputElement)?.value;
      const contact = (document.getElementById("contact") as HTMLInputElement)?.value;

      // Education fields
      const tenthSchool = (document.getElementById("tenthSchool") as HTMLInputElement)?.value;
      const tenthPercentage = (document.getElementById("tenthPercentage") as HTMLInputElement)?.value;
      const interCollege = (document.getElementById("interCollege") as HTMLInputElement)?.value;
      const interPercentage = (document.getElementById("interPercentage") as HTMLInputElement)?.value;
      const degreeUniversity = (document.getElementById("degreeUniversity") as HTMLInputElement)?.value;
      const degreePercentage = (document.getElementById("degreePercentage") as HTMLInputElement)?.value;

      // Other fields
      const experience = (document.getElementById("Experience") as HTMLSelectElement)?.value;
      const address = (document.getElementById("address") as HTMLTextAreaElement)?.value;
      const skills = (document.getElementById("skills") as HTMLTextAreaElement)?.value;
      const achievements = (document.getElementById("achievements") as HTMLTextAreaElement)?.value;

      // Get selected languages
      const selectedLanguages = Array.from(document.querySelectorAll('input[name="languages"]:checked'))
        .map(cb => (cb as HTMLInputElement).value)
        .join(', ');

      console.log('Form data collected:', { 
        username, name, email, birth, gender, contact,
        tenthSchool, tenthPercentage, interCollege, interPercentage,
        degreeUniversity, degreePercentage, experience, skills, achievements
      }); // Debug log

      // Get photo file name
      const photoInput = document.getElementById("photo") as HTMLInputElement;
      const photoFileName = photoInput.files ? photoInput.files[0]?.name : '';

      // Check if all required fields are filled
      if (!username || !name || !email || !birth || !gender || !contact) {
        alert("Please fill in all the required fields.");
        return;
      }

      // Save form data in localStorage
      const resumeData = {
        username,
        name,
        email,
        birth,
        gender,
        contact,
        tenthSchool,
        tenthPercentage,
        interCollege,
        interPercentage,
        degreeUniversity,
        degreePercentage,
        experience,
        address,
        skills,
        achievements,
        selectedLanguages,
        photoFileName
      };

      localStorage.setItem(username, JSON.stringify(resumeData));

      // Generate resume HTML
      const dynamicResume = `
      <div class="container">
          <div id="personal-information">
              <h2>Personal Information</h2>
              <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
              <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
              <p><b>Date of Birth:</b> <span contenteditable="true">${birth}</span></p>
              <p><b>Gender:</b> <span contenteditable="true">${gender}</span></p>
              <p><b>Contact:</b> <span contenteditable="true">${contact}</span></p>
              <p><b>Address:</b> <span contenteditable="true">${address}</span></p>
          </div>

          <div id="education">
              <h2>Education</h2>
              <h3>10th</h3>
              <p><b>School:</b> <span contenteditable="true">${tenthSchool}</span></p>
              <p><b>Percentage:</b> <span contenteditable="true">${tenthPercentage}</span></p>
              
              <h3>Intermediate</h3>
              <p><b>College:</b> <span contenteditable="true">${interCollege}</span></p>
              <p><b>Percentage:</b> <span contenteditable="true">${interPercentage}</span></p>
              
              <h3>Degree</h3>
              <p><b>University:</b> <span contenteditable="true">${degreeUniversity}</span></p>
              <p><b>Percentage:</b> <span contenteditable="true">${degreePercentage}</span></p>
          </div>

          <div id="other-details">
              <h2>Other Details</h2>
              <p><b>Experience:</b> <span contenteditable="true">${experience} years</span></p>
              <p><b>Skills:</b> <span contenteditable="true">${skills}</span></p>
              <p><b>Achievements:</b> <span contenteditable="true">${achievements}</span></p>
              <p><b>Languages Known:</b> <span contenteditable="true">${selectedLanguages}</span></p>
          </div>
      </div>`;

      // Display the generated resume
      displayform.innerHTML = dynamicResume;
      console.log('Resume generated'); // Debug log

      // Show shareable link
      const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
      shareableLinkContainer.style.display = 'block';
      shareableLinkElement.href = shareableURL;
      shareableLinkElement.textContent = shareableURL;
      downloadPdfButton.style.display = 'block'; // Make sure download button is visible

    } catch (error) {
      console.error('Error generating resume:', error);
    }
  });

  // Handle PDF download
  downloadPdfButton.addEventListener('click', () => {
    generatePDF();
  });

  // Load saved data if username is in URL
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById('username') as HTMLInputElement).value = username;
      (document.getElementById('fullname') as HTMLInputElement).value = resumeData.name;
      (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
      (document.getElementById('birth') as HTMLInputElement).value = resumeData.birth;
      (document.getElementById('gender') as HTMLInputElement).value = resumeData.gender;
      (document.getElementById('contact') as HTMLInputElement).value = resumeData.contact;
      (document.getElementById('tenthSchool') as HTMLInputElement).value = resumeData.tenthSchool;
      (document.getElementById('tenthPercentage') as HTMLInputElement).value = resumeData.tenthPercentage;
      (document.getElementById('interCollege') as HTMLInputElement).value = resumeData.interCollege;
      (document.getElementById('interPercentage') as HTMLInputElement).value = resumeData.interPercentage;
      (document.getElementById('degreeUniversity') as HTMLInputElement).value = resumeData.degreeUniversity;
      (document.getElementById('degreePercentage') as HTMLInputElement).value = resumeData.degreePercentage;
      (document.getElementById('Experience') as HTMLSelectElement).value = resumeData.experience;
      (document.getElementById('address') as HTMLTextAreaElement).value = resumeData.address;
      (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
      (document.getElementById('achievements') as HTMLTextAreaElement).value = resumeData.achievements;
    }
  }
});

function generatePDF() {
  const element = document.getElementById('display');
  const opt = {
    margin: 1,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Generate PDF
  html2pdf().set(opt).from(element).save();
}
