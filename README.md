# AI/ML Bootstrap

[![AI/ML Bootstrap (CI)](https://github.com/SebGSX/AI-ML-Bootstrap/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/SebGSX/AI-ML-Bootstrap/actions/workflows/continuous-integration.yml)
[![GitHub tag](https://img.shields.io/github/tag/SebGSX/AI-ML-Bootstrap?include_prereleases=&sort=semver&color=blue)](https://github.com/SebGSX/AI-ML-Bootstrap/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
[![issues - AI-ML-Bootstrap](https://img.shields.io/github/issues/SebGSX/AI-ML-Bootstrap)](https://github.com/SebGSX/AI-ML-Bootstrap/issues)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=bugs)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=SebGSX_AI-ML-Bootstrap&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=SebGSX_AI-ML-Bootstrap)

## Overview

Artificial intelligence (AI) and machine learning (ML) are exciting, innovative fields. Unfortunately, they're
extremely technical and can be daunting to newcomers. If you have a rough idea what AI and ML are, have good
technical skills, and want to get started quickly, then this project and its associated guide are designed with you
in mind.

The code in this project provides you with a working AI based on a pretrained ML model. This project's associated
guide provides insight into building your own developer workstation including hardware and software, then connects
you with the community's resources, and ends with book recommendations. In other words, all the resources you need
in one place to get started quickly.

The project includes the following key components:

1. **AI/ML Bootstrap Guide:** The [AI/ML Bootstrap Guide](/docs/ai-ml-bootstrap-guide.md) provides all the core content
   you need to help you get
   started from building a developer workstation, and installing software to finding datasets, models, and foundational
   literature.
2. **Inference Engine:** The [Inference Engine](/inference_engine) is a Python-based gRPC server that loads a
   pretrained model and exposes it via a gRPC interface. The engine is designed to be modular and extensible, allowing
   you to swap out models as needed. The models are sourced from [Hugging Face](https://huggingface.co/). Please follow
   the instructions in the [Inference Engine README](/inference_engine/README.md) to get started.
3. **Inference API:** The [Inference API](/inference_api) is a .NET Web API that acts as a wrapper for the Inference
   Engine. It exposes RESTful endpoints that can be consumed by front-end applications. Please follow the instructions
   in the [Inference API README](/inference_api/README.md) to get started.
4. **Inference SPA:** The [Inference SPA](/inference_spa) is a React/Next front-end application that provides a user
   interface for interacting with the Inference API. It allows users to input text prompts and receive responses from
   the AI chatbot. Please follow the instructions in the [Inference SPA README](/inference_spa/README.md) to get
   started.

## Intended Audience

The audience is assumed to be technically proficient with professional-grade skill in software engineering. The
audience should be able to build a developer workstation from component parts, install and configure operating systems,
and install and configure software.

## Languages and Software Used

This project is written in Python, C#, and TypeScript and leverages the software listed in the project's associated
[AI/ML Bootstrap Guide](/docs/ai-ml-bootstrap-guide.md).

## Author's Motivation

When I set out to build this project in 2023, I wanted to do some AI/ML research. Had this project existed, I would
have used it. Unfortunately, I couldn't find anything that brought together everything I needed in one place. Out of
professional curiosity, I also wanted to figure out what impact AI would have in helping me learn about AI and ML.
To that end, I would like to share the following information.

## Conclusions on AI Assistance

### Full Disclosure

I am not an AI or ML expert. Prior to this project, I had never coded in Python, worked with gRPC, or touched
React/Next. I am an assembly, C/C++, and C# developer with experience in HTML, CSS, JS, TS, and Aurelia. Given
that the majority of the material was new to me, the project presented a wonderful opportunity to investigate the
effectiveness of AI-assisted learning.

For reference, I started the 2023 work on 28 March 2023 and completed the work the evening of 18 April 2023. The work
was done part-time in the evenings, on weekends, and on public holidays over three weeks. End-to-end, everything
took me roughly 130 hours. For context: from 28 March 2023 to 4 April 2023, I focused on hardware research,
acquisition, and assembly along with the installation / upgrade of all needed software and firmware. Coding started
the evening of 5 April 2023.

> As of September 2025, the findings remain valid.

#### A Note of Caution

Please note that using a publicly accessible AI service like ChatGPT may not be permitted by your organisation for
your day-to-day job. Such prohibition may be due to confidentiality as well as statutory and regulatory compliance
reasons. I am neither an attorney nor qualified to give legal advice, I thus urge you to obtain advice as appropriate.

I was able to use ChatGPT freely in this context because the entire project is open-source and I own all the IP.
Specifically, I built the project using my own time, software, services, hardware, etc. and did so outside the course
and scope of my employment. As such, I legitimately own the intellectual property and all rights under copyright.
Your circumstances may differ, I strongly recommend that you obtain advice as appropriate.

> As of September 2025, the above note remains valid.

#### AI-Assisted Proofreading and Copyediting

ChatGPT assisted greatly in preparing all initial (2023) documentation for this project. The AI assisted with
proofreading and copyediting by assessing accuracy, completeness, and style as well as tone. The AI assessed style
and tone in terms of grammar, politeness, professionalism, and spelling. As of September 2025, I continue to use AIs
for proofreading and copyediting; however, I now use Grok.

#### AI-Assisted Learning

When learning, time is a vital factor. Given the gaps and other shortcomings in my expertise noted in this full
disclosure section, traditional learning methods would have been too time-consuming for a part-time project. With
AI, I had and continue to have, an on-demand, cost-effective tutor that is also a polymath. No more searching through
Google, Stack Exchange, GitHub, Kindle books, package code, sample code, research papers, etc.; all I need do is ask
the AI for help. That doesn't negate good reference material, but it does make finding the right reference material less
time-consuming.

Don't get me wrong, traditional tools are great; however, the number of dead ends, rabbit holes, and wild goose
chases caused by the difficulties inherent to being a newcomer are highly wasteful. By contrast, having an
ever-patient tutor that can just as quickly answer a question about coding as it can about the best way to phrase
something, is an efficiency windfall. Add to that the ability to create effective samples, and AI-assisted learning
can be a highly efficient way to learn when used correctly.

> While AI-assisted learning is a game-changer by any definition, it isn't infallible. Just like all tutors, AIs
> make mistakes whether from issues with their training, issues with out-of-date information, or unintended biases.
> That's okay; just remember to check and verify just like you would with a tutor. Lastly, all learning is based on
> how much the learner invests. While AI-assisted learning is highly efficient if used correctly, investment of time,
> energy, and effort remains the determinant of the value derived.

> As of September 2025, the findings remain valid.

#### AI-Assisted Coding

First things first, the word here is acceleration. Python was a breeze to get through with the help of ChatGPT. It's
a lovely language and the type hints as well as object orientation made me feel right at home. It didn't take long
for me to write testable code following the SOLID principles as well as the factory and options patterns. The
.NET/C# work was a breeze despite my last project being .NET 5 (despite version 7 at time of writing in 2023). Then
came the front-end code. I struggled for one Sunday and two evenings because I'm not a strong front-end coder.
Nonetheless, I managed to pull together the app in barely 6 hours. The rest of the time was spent figuring out how to
test the front-end code correctly.

Like AI-assisted learning, AI-assisted coding is a game-changer. That said, where I had good skill that translated
well, I moved quickly and painlessly. But, where I had gaps, the AIs and me led each other in circles. Accordingly,
taking a pairing view with a healthy understanding of both the human and AI participants, exceptional results can be
achieved.

As with any team, all members need to do what is required to help the team succeed. In AI/human coding pairs, the human
really needs to understand the work to guide the AI. The AI is great with detail when given explicit guidance
whereas the human needs to prepare the guidance and check the results produced. I can say with confidence that the
AIs challenged me to think more deeply about the coding objectives we were addressing, which improved my skills in an
unexpected but fortunate manner.

> As of September 2025, the findings remain valid.

## The AI Chatbot

Please see below for a screen capture of the chatbot AI built in this project:

![image](/docs/ai-chatbot-screen-capture.png)

## Contributing

Please see [Contributing](/CONTRIBUTING.md) for details.

## License

Released under [MIT](/LICENSE) by [@SebGSX](https://github.com/SebGSX) (Seb Garrioch).
