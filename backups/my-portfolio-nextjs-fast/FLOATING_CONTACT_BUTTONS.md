# Floating contact buttons

The landing page now has a fixed contact rail on the bottom-right, styled to match the dark/cyan portfolio UI.

- Gmail: uses the profile email from the database (`mailto:`).
- WhatsApp: set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the international phone number.
- Telegram: set `NEXT_PUBLIC_TELEGRAM_USERNAME` to the username, with or without `@`.
- GitHub: uses `NEXT_PUBLIC_GITHUB_URL`.

Example environment values:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=15551234567
NEXT_PUBLIC_TELEGRAM_USERNAME=yourusername
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
```

The WhatsApp and Telegram buttons remain hidden until their values are configured, so the project never ships with placeholder contact details.
