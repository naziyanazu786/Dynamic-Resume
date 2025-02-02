// importing ids
// milestone 3
var form = document.getElementById('inputs');
var displayform = document.getElementById('display');
// milestone 4 and 5
var shareableLinkContainer = document.getElementById("sharable-link");
var shareableLinkElement = document.getElementById('share-link');
var downloadPdfButton = document.getElementById('download');
const resumeSection = document.getElementById('resume-section');

// Add these constants at the top of your file, right after your variable declarations
const opt = {
    margin: 10,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
        scale: 2,
        logging: true,
        useCORS: true
    },
    jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
    }
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    try {
        // Get form values
        const username = document.getElementById('username').value;
        const name = document.getElementById('fullname').value;
        const email = document.getElementById("email").value;
        const birth = document.getElementById("birth").value;
        const gender = document.getElementById("gender").value;
        const contact = document.getElementById("contact").value;
        
        // Education fields
        const tenthSchool = document.getElementById("tenthSchool").value;
        const tenthPercentage = document.getElementById("tenthPercentage").value;
        const interCollege = document.getElementById("interCollege").value;
        const interPercentage = document.getElementById("interPercentage").value;
        const degreeUniversity = document.getElementById("degreeUniversity").value;
        const degreePercentage = document.getElementById("degreePercentage").value;
        
        // Other fields
        const experience = document.getElementById("Experience").value;
        const address = document.getElementById("address").value;
        const skills = document.getElementById("skills").value;
        const certifications = document.getElementById("certifications").value;
        
        // Get selected languages
        const selectedLanguages = Array.from(document.querySelectorAll('input[name="languages"]:checked'))
            .map(cb => cb.value)
            .join(', ');

        // Calculate age
        const age = calculateAge(birth);

        // Generate resume HTML with updated template
        const dynamicResume = `
            <div class="resume-content">
                <div class="resume-header">
                    <h1 style="text-align: center; color: #333; margin-bottom: 20px;">RESUME</h1>
                </div>

                <div class="resume-section">
                    <h2 style="background-color: #f0f0f0; padding: 5px;">PERSONAL INFORMATION</h2>
                    <table style="width: 100%; margin-top: 10px;">
                        <tr>
                            <td style="width: 30%;"><strong>Name:</strong></td>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <td><strong>Date of Birth:</strong></td>
                            <td>${birth}</td>
                        </tr>
                        <tr>
                            <td><strong>Gender:</strong></td>
                            <td>${gender}</td>
                        </tr>
                        <tr>
                            <td><strong>Contact:</strong></td>
                            <td>${contact}</td>
                        </tr>
                        <tr>
                            <td><strong>Address:</strong></td>
                            <td>${address}</td>
                        </tr>
                    </table>
                </div>

                <div class="resume-section">
                    <h2 style="background-color: #f0f0f0; padding: 5px;">EDUCATION</h2>
                    <table style="width: 100%; margin-top: 10px;">
                        <tr>
                            <td colspan="2"><strong>10th Standard</strong></td>
                        </tr>
                        <tr>
                            <td style="width: 30%;">School:</td>
                            <td>${tenthSchool}</td>
                        </tr>
                        <tr>
                            <td>Percentage:</td>
                            <td>${tenthPercentage}%</td>
                        </tr>
                        
                        <tr><td colspan="2">&nbsp;</td></tr>
                        
                        <tr>
                            <td colspan="2"><strong>Intermediate</strong></td>
                        </tr>
                        <tr>
                            <td>College:</td>
                            <td>${interCollege}</td>
                        </tr>
                        <tr>
                            <td>Percentage:</td>
                            <td>${interPercentage}%</td>
                        </tr>
                        
                        <tr><td colspan="2">&nbsp;</td></tr>
                        
                        <tr>
                            <td colspan="2"><strong>Degree</strong></td>
                        </tr>
                        <tr>
                            <td>University:</td>
                            <td>${degreeUniversity}</td>
                        </tr>
                        <tr>
                            <td>Percentage:</td>
                            <td>${degreePercentage}%</td>
                        </tr>
                    </table>
                </div>

                <div class="resume-section">
                    <h2 style="background-color: #f0f0f0; padding: 5px;">PROFESSIONAL DETAILS</h2>
                    <table style="width: 100%; margin-top: 10px;">
                        <tr>
                            <td style="width: 30%;"><strong>Experience:</strong></td>
                            <td>${experience} years</td>
                        </tr>
                        <tr>
                            <td><strong>Skills:</strong></td>
                            <td>${skills}</td>
                        </tr>
                        <tr>
                            <td><strong>Certifications:</strong></td>
                            <td>${certifications}</td>
                        </tr>
                        <tr>
                            <td><strong>Languages Known:</strong></td>
                            <td>${selectedLanguages}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;

        // Display the resume
        displayform.innerHTML = dynamicResume;
        
        // Show the resume container
        document.getElementById('resume-section').style.display = 'block';
        
        // Scroll to the resume section smoothly
        document.getElementById('resume-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Show download button
        downloadPdfButton.style.display = 'block';
        
        console.log('Resume generated successfully');
    } catch (error) {
        console.error('Error generating resume:', error);
    }
});

// Replace your existing PDF download handler with this one
downloadPdfButton.addEventListener('click', function() {
    // Get the element
    const element = document.getElementById('display');
    
    // Add loading state
    downloadPdfButton.disabled = true;
    downloadPdfButton.textContent = 'Generating PDF...';
    
    // Basic styles for PDF
    const styleStr = `
        <style>
            .resume-content {
                font-family: "Times New Roman", Times, serif;
                color: black;
                padding: 20px;
            }
            .resume-section {
                margin-bottom: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            td {
                padding: 5px;
                vertical-align: top;
            }
            h1, h2 {
                color: black;
            }
        </style>
    `;
    
    // Create a clone of the element
    const clone = element.cloneNode(true);
    clone.style.background = 'white';
    
    // Create a temporary container
    const container = document.createElement('div');
    container.appendChild(clone);
    container.innerHTML = styleStr + container.innerHTML;
    
    // Generate PDF
    html2pdf()
        .from(container)
        .set(opt)
        .save()
        .then(() => {
            // Reset button state
            downloadPdfButton.disabled = false;
            downloadPdfButton.textContent = 'Download Resume as PDF';
            console.log('PDF generated successfully');
        })
        .catch(err => {
            console.error('PDF generation failed:', err);
            downloadPdfButton.disabled = false;
            downloadPdfButton.textContent = 'Download Resume as PDF';
            alert('PDF generation failed. Please try again.');
        });
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('fullname').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('birth').value = resumeData.birth;
            document.getElementById('gender').value = resumeData.gender;
            document.getElementById('contact').value = resumeData.contact;
            document.getElementById('tenthSchool').value = resumeData.tenthSchool;
            document.getElementById('tenthPercentage').value = resumeData.tenthPercentage;
            document.getElementById('interCollege').value = resumeData.interCollege;
            document.getElementById('interPercentage').value = resumeData.interPercentage;
            document.getElementById('degreeUniversity').value = resumeData.degreeUniversity;
            document.getElementById('degreePercentage').value = resumeData.degreePercentage;
            document.getElementById('Experience').value = resumeData.experience;
            document.getElementById('address').value = resumeData.address;
            document.getElementById('skills').value = resumeData.skills;
            document.getElementById('certifications').value = resumeData.certifications;
            document.getElementById('languages').value = resumeData.selectedLanguages;    
        }
    }
});

// Function to calculate age
function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Update the save data section
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
    certifications,  // Changed from achievements
    selectedLanguages
};
