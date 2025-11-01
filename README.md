# 🌟 ShinyResume - AI-Powered Resume Reviewer

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

**Get professional AI-powered feedback on your resume in seconds!**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing) • [License](#-license)

</div>

---

## 📖 About

**ShinyResume** is an open-source AI-powered resume reviewer that provides instant, comprehensive feedback on your resume. Upload your resume (PDF), optionally provide a job description, and receive detailed analysis including:

- 📊 Overall quality score (0-100)
- 💪 Strengths and weaknesses analysis
- 🎯 Job fit assessment
- 📝 Actionable recommendations
- 🔍 Skills, education, and experience evaluation

Built with Next.js 16, React 19, TypeScript, and powered by LangChain with OpenRouter AI models.

---

## ✨ Features

- **🤖 AI-Powered Analysis**: Leverages Mistral-7B via OpenRouter for intelligent resume evaluation
- **📄 PDF Support**: Upload and analyze PDF resumes with advanced text extraction
- **🎯 Job Matching**: Tailor analysis to specific job descriptions
- **⚡ Real-time Processing**: Fast, server-side analysis with streaming support
- **🎨 Modern UI**: Beautiful, responsive interface built with Tailwind CSS and shadcn/ui
- **🔒 Privacy-Focused**: Your resume data is processed securely and not stored
- **📱 Mobile-Friendly**: Fully responsive design for all devices
- **♿ Accessible**: Built with accessibility best practices

---

## 🎬 Demo

> **Note**: This is currently a demo version. You can try it out by following the installation instructions below.

### Screenshot Preview

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- An **OpenRouter API Key** ([Get one here](https://openrouter.ai/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-portfolio-reviewer.git
cd ai-portfolio-reviewer
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# .env.local
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> **Important**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📋 Usage

### Basic Usage

1. **Upload Your Resume**: Click the upload area or drag & drop a PDF file (max 3MB)
2. **Add Job Description** (Optional): Paste the job description for better tailored feedback
3. **Click "Analyze Resume"**: Wait a few seconds for AI analysis
4. **Review Results**: Get detailed feedback with scores and recommendations

### API Usage

You can also use the API endpoint directly:

```bash
POST /api/analyze-resume
Content-Type: multipart/form-data

Fields:
- resume: PDF file (required)
- jobDescription: string (optional)
```

Example with curl:

```bash
curl -X POST http://localhost:3000/api/analyze-resume \
  -F "resume=@/path/to/resume.pdf" \
  -F "jobDescription=Software Engineer position requiring React and TypeScript"
```

---

## 🛠️ Technology Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Backend & AI

- **[LangChain](https://js.langchain.com/)** - AI orchestration framework
- **[OpenRouter](https://openrouter.ai/)** - AI model API gateway
- **[Mistral-7B](https://mistral.ai/)** - Language model
- **[pdf-parse](https://www.npmjs.com/package/pdf-parse)** - PDF text extraction

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## 📁 Project Structure

```
ai-portfolio-reviewer/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   │   └── analyze-resume/
│   │   │       └── route.ts
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── PrompSection.tsx
│   │   └── ResultSection.tsx
│   ├── lib/              # Utility functions
│   │   ├── rag-chain.ts  # AI chain logic
│   │   └── utils.ts      # Helper functions
│   └── types/            # TypeScript types
│       ├── prompt.type.ts
│       └── schemas/      # Zod schemas
│           ├── prompt.schema.ts
│           └── result.schema.ts
├── .env.local            # Environment variables (create this)
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── next.config.ts        # Next.js config
└── README.md            # This file
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features (when testing is implemented)
- Ensure your code passes ESLint checks: `npm run lint`

### Ideas for Contributions

- 🎨 UI/UX improvements
- 🌐 Internationalization (i18n) support
- 📊 Additional analysis metrics
- 🔧 Support for more file formats (DOCX, TXT)
- 🧪 Unit and integration tests
- 📱 PWA (Progressive Web App) features
- 🔐 User authentication and resume history
- 📈 Analytics and insights dashboard

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue on GitHub!

- **Bug Report**: Describe the issue, steps to reproduce, and expected behavior
- **Feature Request**: Explain the feature and why it would be useful

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment platform
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [LangChain](https://js.langchain.com/) for AI orchestration tools
- [OpenRouter](https://openrouter.ai/) for AI model access
- All contributors who help improve this project

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/YOUR_USERNAME/ai-portfolio-reviewer/issues)
- **Discussions**: [Join the conversation](https://github.com/YOUR_USERNAME/ai-portfolio-reviewer/discussions)

---

## 🌟 Show Your Support

If you find this project helpful, please consider:

- ⭐ Starring this repository
- 🍴 Forking and contributing
- 📢 Sharing with others who might benefit
- 💖 Sponsoring the development (if applicable)

---

<div align="center">

**Made with ❤️ and ☕**

[⬆ Back to Top](#-shinyresume---ai-powered-resume-reviewer)

</div>
