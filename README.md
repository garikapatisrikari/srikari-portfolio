# Srikari Portfolio

A cinematic, animated React + Vite portfolio starter using the approved AI avatar as the hero visual.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Notes
- The approved avatar is at `src/assets/srikari-avatar.png`.
- The resume download uses `assets/Resume.pdf`.
- The contact form uses EmailJS. Copy `.env.example` to `.env` and set:
	- `VITE_EMAIL_SERVICE_ID`
	- `VITE_EMAIL_TEMPLATE_ID`
	- `VITE_EMAIL_PUBLIC_KEY`
- In the EmailJS template, set the recipient to `garikapatisrikari@gmail.com` and use these variables: `subject`, `name`, `email`, `reply_to`, `message`, and `to_email`.
- Configure the EmailJS template subject as `{{subject}}`, message body with the provided variables, and `Reply-To` as `{{reply_to}}`.
- Never commit `.env`; it is ignored by Git. The public key is safe for browser use, but service and template IDs should still be configured through environment variables.
