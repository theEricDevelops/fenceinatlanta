interface FormData {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

export const initEstimateForm = (formId: string, formContentId: string, successMessageId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement;
  const formContent = document.getElementById(formContentId);
  const successMessage = document.getElementById(successMessageId);

  if (!form || !formContent || !successMessage) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY', // Replace with your Web3Forms key
          to: 'eric@trafficlight.me',
          subject: 'New Fence Estimate Request',
          from_name: formData.get('name'),
          message: `
            Name: ${formData.get('name')}
            Phone: ${formData.get('phone')}
            Email: ${formData.get('email')}
            Project Type: ${formData.get('projectType')}
            Message: ${formData.get('message')}
          `
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show success message
        formContent.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  });
};