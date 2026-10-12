import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

// AJAX Contact Form Submission Handler
document.addEventListener('DOMContentLoaded', () => {
  const contactForms = document.querySelectorAll('form.contact-form');

  contactForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit';
      const statusContainer = form.querySelector('.form-status');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Sending Request...
        `;
      }

      if (statusContainer) {
        statusContainer.classList.add('hidden');
        statusContainer.innerHTML = '';
      }

      try {
        const formData = new FormData(form);
        const actionUrl = form.getAttribute('action') || 'https://formspree.io/f/xblywzyo';

        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          form.reset();
          if (statusContainer) {
            statusContainer.className = 'form-status p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center gap-2';
            statusContainer.innerHTML = `
              <svg class="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Thank you! Your inquiry has been sent directly to Dave. We will call you shortly.</span>
            `;
            statusContainer.classList.remove('hidden');
          } else {
            alert('Thank you! Your request has been sent to Dave.');
          }
        } else {
          const data = await response.json().catch(() => ({}));
          const errorMsg = (data.errors && data.errors.map(err => err.message).join(', ')) || 'There was an issue sending your message. Please call us directly on 0747 414 1343.';
          if (statusContainer) {
            statusContainer.className = 'form-status p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2';
            statusContainer.innerHTML = `
              <svg class="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>${errorMsg}</span>
            `;
            statusContainer.classList.remove('hidden');
          } else {
            alert(errorMsg);
          }
        }
      } catch (err) {
        if (statusContainer) {
          statusContainer.className = 'form-status p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2';
          statusContainer.innerHTML = `
            <svg class="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Network connection error. Please call our line on 0747 414 1343.</span>
          `;
          statusContainer.classList.remove('hidden');
        } else {
          alert('Network connection error. Please call our line on 0747 414 1343.');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  });
});
