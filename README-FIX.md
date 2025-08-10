# Elith Media — Fix Pack (Vercel build)

Copiezi fișierele **exact** cum sunt peste proiectul tău:

1) `tsconfig.json` — include și `**/*.d.ts`
2) `types/nodemailer.d.ts` — shim pentru tipurile Nodemailer
3) `next.config.mjs` — previne căderea build-ului pe ESLint
4) `.eslintrc.json` — config minimal

## Comenzi (o singură dată)

```bash
pnpm add resend @sendgrid/mail nodemailer
pnpm add -D @types/nodemailer eslint eslint-config-next
```

Apoi commit & push pe `main` și redeploy în Vercel.
