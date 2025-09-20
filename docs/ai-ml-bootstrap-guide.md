# AI/ML Bootstrap Guide

## 1. Copyright, License, and Disclaimer

© 2025 Seb Garrioch. All rights reserved.

Published under the [MIT License](/LICENSE).

**Disclaimer:** The information, recommendations, and guidance provided in this document are provided "as-is" for 
informational and educational purposes only, based on the author's knowledge and research as of the document's creation 
date. Artificial intelligence and machine learning technologies, including hardware, software, and related practices, 
evolve rapidly and may become outdated or inaccurate over time. The author makes no representations, warranties, or 
guarantees of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or 
availability of the content. Users are strongly advised to conduct their own independent research, verify 
compatibility, and consult with qualified professionals before making any purchases, implementations, or decisions 
based on this guide. The author shall not be liable for any direct, indirect, incidental, special, consequential, or 
punitive damages arising from the use of or reliance on this document, including but not limited to financial losses, 
hardware failures, data loss, or unmet expectations. By accessing or using this guide, you acknowledge and agree to 
these terms.

## 2. Introduction

This document is an artificial intelligence (AI) and machine learning (ML) bootstrap guide. The guide provides 
instructions for technologists who want an onramp for artificial intelligence and machine learning. The author’s 
intention is to help accelerate the learning path so that time, energy, and other resources are used most 
efficiently. Accordingly, the guide is provided with supporting code that implements a sample, production-ready 
architecture that is by no means the only possible solution. Needs vary and technologies evolve, the reader is 
advised to plan and execute accordingly. 

This guide is written for a highly technical audience unfamiliar with building AI and ML projects. That said, the 
author assumes that the reader has at minimum a conceptual understanding of AI and ML. As such, those concepts are 
not explained to keep the text concise. Similarly, it is assumed that the reader is familiar with hardware, software,
infrastructure, development, architecture, infosec, DevOps, etc. and as such, those topics are not explained. The 
author further assumes that if the reader needs additional information that the reader will make use of resources 
such as ChatGPT, Google, Kindle, or similar services for help.

## 3. Acknowledgements

Before I begin, it is imperative to acknowledge the thousands if not tens of thousands who have contributed to the 
vast amount of intellectual property underpinning AI and ML. Whether in the form of books, articles, mathematics, 
hardware, software, other technologies, data, etc., AI and ML would not be possible without the contributions from 
many fields and many communities. The fact that so much of the intellectual property is open source and accessible 
to all, is both encouraging and humbling. All I can say is thank you.

OpenAI's ChatGPT proofread and checked the initial (2023) content of this guide, which greatly improved the speed at 
which I was able to prepare it from my notes. For the 2025 update, Grok (from xAI) provided similar assistance.

## 4. Hardware

### 4.1. Overview

Given the proliferation of cloud-based GPUs, it is possible and arguably more cost-effective in the long-run to make 
use of cloud-hosted developer workstations. The challenge with cloud-hosted developer workstations is that the 
developer workflow and experience are often degraded by latency. Further, even under the best circumstances latency 
can be created by resource contention, traffic, and outages.

Latency essentially knocks developers out of the zone, which impacts productivity (business concern) and psychological 
flow (developer concern). Accordingly, a dedicated, on-premises developer workstation is recommended for reasons of 
productivity and enjoyment. There are fundamentally four options for providing a developer workstation:

- Workstation (self-built or OEM) with a Jetson Nano from Nvidia or similar external device (least expensive but can be
  limiting unless using a high-end workstation);
- Self-built workstation (highly customisable, cost-controllable, but requires technical skill and time to build);
- OEM-built workstation by Dell or similar (more expensive but with access to high-end hardware and no need to 
  build the workstation); and
- Specialist OEM-built workstation by Puget Systems or similar (most expensive but with access to the highest-end 
  components and no need to build the workstation).

Given that OEMs like Dell and Puget Systems will provide guidance on hardware selection, this guide focuses on the 
self-built workstation option. There are fundamentally four workloads to consider when building a workstation:

- The software development workload to build the AI/ML software;
- The pre-processing workload to prepare datasets for use in training and fine-tuning;
- The ML workload to train, transform, and fine-tune models, and 
- The AI workload to perform inference from models.

Training new models from scratch (foundational models) that are highly accurate is computationally expensive. 
Accordingly, the ML workload should be offloaded to the cloud or to dedicated server hardware for the ML experiments 
that produce said models. Similarly, the AI workload should be offloaded so that multiple concurrent users can be 
served for QA, testing, etc. That said, it must be noted that performing inference from models is considerably less 
computationally demanding than training the models, which is why models can be served on inexpensive hardware in some 
cases.

Irrespective of any off-loading, the developer workstation must be able to accommodate pre-processing as well as 
small experiments that serve as proofs-of-concept. The limit in task complexity directly correlates to the amount of 
time taken by the workstation to compute. When the workstation is busy, the developer is idle. Accordingly, the more 
powerful the workstation, the more complexity that can be handled in an acceptable timeframe.

Thus, hardware is an optimisation problem that balances cost and developer productivity.

### 4.2. Recommended Minimum Hardware Specification for a Self-Built Developer Workstation

When reviewing the following specifications, please bear in mind that the guidance was written initially in March/April 
2023 then updated in September 2025. Accordingly, the hardware specifications reflect the available hardware at the 
time. Whether reading this guide close to the time of writing or later, what matter most are the principles guiding the 
choices. The principles matter because they’re designed to maximise performance in a cost-optimised manner that reduces 
waste caused by over-spec.

Please note that a developer workstation is no match for a cloud-based production system. Such production systems 
typically comprise multiple nodes underpinning clusters. Each such node typically comprises high-performance storage 
and vast amounts of RAM with multiple CPUs and GPUs where all the hardware is datacentre quality. With libraries like 
JAX providing for distributed processing across multi-GPU and multi-node systems, it’s best to leave the heavy lifting 
to the cloud services or a purpose-built datacentre.

#### 4.2.1. Central Processing Unit (CPU)

AI and ML are CPU intensive meaning that a good CPU is vital. When choosing a CPU, choose a CPU with many cores and 
a large on-die cache. If possible, choose a CPU with no graphics processing capability to save a small amount on 
cost. Similarly, choosing a CPU that cannot be overclocked will save on cost. Realistically, overclocking the CPU 
creates stability challenges that are counterproductive to AI/ML work. That said, if you’re willing to spend more on 
cooling and are willing to do the work to test for stability, overclocking may be valuable. Please do bear in mind 
that not all CPUs are created equal in terms of overclocking potential and that as such, your mileage may vary.

When I built my workstation in 2023, I chose the Intel 13900F CPU, which has 8 performance core, 16 efficient cores, 
and provides for 32 threads in total. The CPU has 36MB of on-die cache, no graphics processing capability, and cannot 
be overclocked. I chose that CPU because it was the best available consumer-grade device within the Intel range that 
satisfied the requirements in this section. As of September 2025, the CPU remains a good choice and as such is the
recommended minimum spec.

> Please note that while the CPU I selected is good in terms of consumer-grade hardware, it is the minimum spec for 
> meaningful AI/ML work.

#### 4.2.2. Random Access Memory (RAM)

In terms of RAM, think big because AI and ML are memory intensive. If your CPU, chipset, and motherboard support 
128GB maximum, then get 128GB. Make sure to get matched pairs for dual channel and make sure that all slots are 
filled on the motherboard.

RAM speed is also important; however, there is a risk of overspending or buying incompatible RAM. Please be sure to 
check that your CPU, chipset, and motherboard support the type of RAM you intend to buy. Additionally, while the 
latest double data rate (DDR) synchronous dynamic random-access memory (SD-RAM) always boasts exceptional speeds, 
such speeds aren’t necessarily valuable. To optimise cost and performance, choose RAM that at minimum runs about as 
fast as the CPU’s on-die cache but not faster than the CPU’s maximum turboboost frequency.

At the time of writing in 2023, I chose two sets of 64GB (2x32GB) Corsair Vengeance DDR5 SD-RAM with a maximum 
frequency of 5,600Mhz. I chose that speed because that is the maximum turboboost frequency for my CPU and because my 
motherboard and chipset support it.

> Please note that while 128GB is the maximum that my selected motherboard supports, it is the minimum spec for 
> meaningful AI/ML work.

#### 4.2.3. Graphics Processing Unit (GPU)

In general, get the best GPU you can afford because AI and ML benefit tremendously from the parallelisation GPUs 
offer. Some GPUs are factory overclocked, which is good. Please make sure that your power supply unit (PSU) has 
enough power for all your components so that stability is ensured. Further, please ensure that your case has 
sufficient cooling and that your cables are properly managed to aid airflow, which in turn helps to ensure stability.

> A note of caution. GPUs are notoriously hungry for energy and become more so when overclocked. While a GPU may be 
> rated to work with a 1,000W PSU for example, overclocking will increase PSU load so be sure to provide accordingly.
> If you do choose to overclock your GPU and your system then starts to shut down (even gracefully) without warning, 
> it may indicate that your PSU likely cannot handle the extra load.

At the time of writing in 2023, I chose the Asus ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X. It has 16,384 CUDA 
Cores, 24GB GDDR6X RAM, and an engine clock that runs at 2,640Mhz (OC) and 2,610Mhz (default). The device has a 384-bit 
memory bus and a memory speed of 21Gbps. I chose that GPU because it was the best available consumer-grade device 
within the Nvidia range that satisfied the requirements in this section. As of September 2025, the GPU remains a good 
choice and as such is the recommended minimum spec. A Jetson Nano or similar could also be used either as standalone
or in conjunction with the GPU.

> Please note that while the GPU selected is good in terms of consumer-grade hardware, it is the minimum spec for 
> meaningful AI/ML work.

#### 4.2.4. Storage

Like with RAM, when it comes to storage think big because AI and ML need lots of space. Even the fastest storage is 
considerably slower than RAM, which means that its speed is an important concern to avoid bottlenecks. When 
considering storage performance, a lot of things matter. The mechanism of storage, the interface, and the number of 
storage devices working together, all contribute to storage performance. At the time of writing in 2023, the fastest 
mechanism of storage is Non-Volatile Memory Express (NVMe), and the fastest interface for storage devices is 
Peripheral Component Interconnect Express (PCIe). NVMe storage devices connect via PCIe, which makes such devices the 
natural choice for high performance. Further, GPUs connect via PCIe, which allows them to communicate directly with 
NVMe devices. Doing so improves performance by excluding the CPU from communication. Accordingly, NVMe devices are 
ideal for AI and ML purposes.

When determining the speed required from the storage subsystem, a good place to start is to look at the GPU’s memory 
speed. The storage subsystem serves more than just the GPU. As such, it makes sense to ensure that the minimum storage 
read speed should comfortably exceed the GPU’s memory transfer speed. The GPU's memory transfer speed is the maximum 
rate at which data can be read from or written to the GPU's memory from external devices in the system. Such speed 
tends to be quite high. As such, achieving the desired performance target for the storage subsystem given the 
limitations of NVMe, requires the use of multiple devices working together.

Multiple devices working together is known as a redundant array of independent disks (RAID). There are many RAID 
configurations, called levels. What we need is a configuration that shares the workload equally among all 
participating disks. RAID level 0 achieves such a requirement. Thus, the number of devices we need and how fast they 
should be, are guided by our storage subsystem's performance target as informed by the GPU's memory transfer speed. 
Generally, the maximum storage read speed should be roughly 10 times the GPU’s memory speed to account for the speed 
differences between NVMe and RAM in terms of latency.

If for example a GPU’s memory speed is 15Gbps, the target maximum storage read speed should be 150Gbps. To satisfy 
the example, if a motherboard supports four M.2 NVMe solid state drives (SSDs), each drive will need a maximum read 
speed of ~4.7GB/s to meet the 150Gbps target. Generally, the smaller capacity, lower speed NVMe devices provide more 
value per gigabyte than their larger and faster counterparts. As such, it is most cost-effective to get the maximum 
number of devices that the motherboard will support. Once speed is addressed, scale up storage capacity bearing in 
mind that all devices must be the same specification to work together optimally in a RAID configuration.

At the time of writing in 2023, I chose four Samsung Evo 980 Pro NVMe 2TB SSDs with a maximum read speed of 7GB/s. I 
chose that type of device because it meets the 210Gbps target calculated from my GPU’s 21Gbps memory speed. I chose the 
2TB option for the devices because 8TB (4x2TB) in total is both sufficient and future-proof while also being 
cost-effective.

> Though not essential, it is recommended that an external, spindle disk is used to provide for backups and the 
> storage of non-essential data. At the time of writing in 2023, I chose a 12TB SanDisk G-Drive that connects via USB-C.

#### 4.2.5. Motherboard

Motherboards are a great way to overspend. Vendors charge considerably more for enthusiast devices with fancy LEDs, 
cool aesthetics, and support for the fastest components as well as overclocking. The trap is thinking that having 
the fastest components will produce the best results. Generally, enthusiast level hardware is great for bragging 
rights and not much else in a practical sense. To avoid overspending, spec your CPU, RAM, GPU, and storage then find 
an appropriate motherboard. Even if you intend on overclocking, you likely don’t need the flagship product.

> To maximise compatibility as well as aid in optimisation, it tends to be a good idea to get your motherboard from 
> the same manufacturer as your GPU.

At the time of writing in 2023, I chose the Asus Prime Z790-A Wi-Fi motherboard. I chose that motherboard because it 
was the best available consumer-grade device within the Asus range that satisfied the requirements in this section.

### 4.3. Next Steps

Once you’ve decided on the hardware you need, the next steps are sourcing the components and assembling the 
workstation. Building a workstation is not a trivial task. Even if you’re an experienced builder, please be sure to 
read the manuals and check that your skills are up to date. I recommend having a chat with Grok or ChatGPT to get a
sense of what to expect as well as recommendations for YouTube videos to watch.

Further, the components you’ll buy are expensive. As such, they should be handled with care. Handling with care 
means having an anti-static mat and wrist strap, both of which being connected to an anti-static grounding adapter. 
For your own safety, be sure to buy a reliable anti-static grounding adapter from a reputable source. Additionally, 
an anti-static tray for keeping track of screws and washers is a blessing. In addition to anti-static measures, 
please be sure to have appropriate computer assembly tools and to be gentle with the components.

I use an anti-static mat, wrist strap, and tray as well as tools provided by iFixit because they’re professional 
grade. I use an anti-static grounding adapter provided by NOSHOCK ESD UK. Before deciding on any of the tools 
mentioned herein, please do your research for the sake of your personal safety and the safety of your components.

Once everything is assembled, please ensure that you verify your cooling settings within your motherboard’s firmware.
While quieter operation tends to be preferred, enhanced cooling improves stability and component longevity. Running 
all cooling on maximum would be the best technical solution, but doing so is often too loud. As such, using a turbo 
cooling profile that ramps up cooling more quickly may be the best compromise. Please be sure to adjust accordingly.

> Keeping ambient temperature low with air-conditioning is another great way to reduce cooling load on the workstation.

## 5. Software and Firmware

To develop AI and ML solutions, a large amount of software is required. Please be careful to ensure that all 
licensing requirements are met. Generally, many pieces of software are free or have a reduced price for 
non-commercial use. Even open-source software, which is generally free, may have restrictions on commercial 
applications. Please be sure to check.

To get the maximum benefit from your developer workstation, please ensure that all software is 64-bit where possible.
Please also ensure that you get the latest, stable software and that you keep all software updated. Please note that 
while the software suggested provides you with everything you need to serve a pretrained model for inference, 
fine-tune models, and train models, the software needed by specific solutions will vary.

### 5.1. Operating System (OS)

Whether your preference is Microsoft Windows or Linux, please make sure that you get the latest operating system and 
ensure that it is fully updated. Irrespective of OS chosen, please don’t forget a good antivirus software as well. 
By good, I mean one that keeps your system safe without interfering with your work.

When building a new computer and using Windows, you may want to consider using an OEM license. An OEM license is 
less expensive than a retail license for Windows; however, it does not come with access to Microsoft Support, and it 
is tied to the machine on which it is installed. Please be sure to choose the Pro edition of Windows so that you are 
not restricted on any feature.

### 5.2. Drivers and System Utilities

Once your operating system is installed and updated, please make sure to update all your drivers to their latest 
versions. Further, please ensure that all necessary system utilities such as those required for cooling and 
overclocking are installed and up to date. For example, iCUE and GPU Tweak are such utilities.

### 5.3. System Test and Firmware Update

Once you have your developer workstation with the OS and drivers installed and up to date, it is vital that you test 
the system before updating any firmware. Firmware updates that are interrupted can make the affected component 
unusable. Accordingly, it’s good practice to check that your system is stable before updating any firmware.

#### 5.3.1. RAM Test

If you’re using Windows, test your RAM using Windows Tools => Windows Memory Diagnostic. If you’re using Linux, 
you’ll need to use MemTest86+. 

#### 5.3.2. CPU Test

Before running any CPU test, please ensure that your cooling is correctly installed and configured. While not an 
exhaustive list, be sure to check that fans are spinning at the correct speeds, thermal paste is applied correctly, 
heatsinks are fitted correctly, water-pumps are pumping at the correct rate, cabling is neat, and air intakes and 
outlets are unobstructed. Stress tests push your CPU utilisation to 100%, which consumes more power. That extra 
power consumption means extra heat, which can damage the CPU and motherboard if there is inadequate cooling.

Irrespective of which OS you’re using, the Great Internet Mersenne Prime Search (GIMPS) project provides a useful 
tool called Prime95 for stress testing CPUs as well as RAM. The stress test will help identify any stability issues 
inherent to the system. Once the memory test is complete, run a Torture Test from within Prime95. Prime95 is 
downloaded from the GIMPS project’s site: https://www.mersenne.org/. As at the time of writing, Prime95 is 
standalone and is extracted into a folder not installed on the system.

#### 5.3.3. Firmware Update

Once you have tested your developer workstation, be sure to update all the firmware. For reasons of stability, 
security, and performance, firmware needs to be up to date. As such, please ensure you update the Unified Extensible 
Firmware Interface (UEFI) or Basic Input/Output System (BIOS), Intel Management Engine (ME), GPU, cooling, and other 
firmware.

### 5.4. Optimisation

To get the maximum benefit from your developer workstation, please be sure to optimise it. The following 
optimisation steps may prove useful:

- Ensure that the OS, drivers, and firmware are up to date.
- Disable all unneeded OS features.
- Uninstall all unneeded apps, especially those that make network calls or run in the background.
- Use a disk clean-up tool to remove old files.
- Defragment and optimise the drives.
- Ensure that cooling and overclocking settings are optimally configured. Utilities such as iCUE, GPU Tweak, and 
  similar are typically useful.

Please note that there are other steps that can be taken and that you may have to rerun optimisation steps from 
time-to-time.

### 5.5. Utilities

The following utilities are recommended but not required:

- Adobe Acrobat Reader
- CPU-Z (https://www.cpuid.com/) and GPU-Z (https://www.techpowerup.com/)
- WinRAR (https://www.win-rar.com/)

### 5.6. IDEs

Generally, the languages used in AI and ML include but are not limited to Python and C/C++. Languages like C# and 
Java also make an appearance. Please note that Python is commonly used within AI and ML, and it is therefore 
necessary. As such, please ensure that you have appropriate Python IDEs installed.

- C/C++: Microsoft Visual Studio (including Community Edition) and JetBrains CLion are good options, as is VS Code 
  with the C/C++ plugins installed.
- Python: Microsoft Visual Studio (including Community Edition) and JetBrains PyCharm is a good option, as is VS 
  Code with the Python plugins installed. JetBrains DataSpell provides a Python IDE targeted at data scientists, 
  which may provide a better experience for certain workloads and approaches.
- Java: JetBrains IntelliJ is a good option.
- C#: Microsoft Visual Studio (including Community Edition) and JetBrains Rider are good options, as is VS Code with 
  the C# plugins installed.

#### 5.6.1. AI Assistance

If used carefully, GitHub Copilot is a worthwhile plugin that can accelerate development using AI. Mundane, 
boilerplate code as well as code that follows established patterns are good use cases. GitHub Copilot also helps 
with code annotation and documentation, which saves time (see: https://github.com/features/copilot). Please also 
note that OpenAI’s ChatGPT+ can also help with coding, explanations, and guidance if used correctly.

#### 5.6.2. Windows Subsystem for Linux

Please note that while Windows provides a compelling developer experience, running AI/ML projects on Windows 
natively is challenging. Accordingly, the Windows Subsystem for Linux (WSL) is recommended as the execution 
environment for AI/ML projects that are developed on Windows machines. WSL is installed by following the 
instructions provided by Microsoft on its Learn site: https://learn.microsoft.com/en-us/windows/wsl/install.

### 5.7. SDKs, Frameworks, Libraries, and Tools

#### 5.7.1. Python (AI/ML Runtime)

Before we do anything else, we need to install the latest version of Python because Python as mentioned previously 
is ubiquitous. Python is downloaded from the Python project’s site: https://www.python.org/.

##### 5.7.1.1. Conda (Package Management)

Conda is a cross-platform and open-source management system for environments and packages. Conda allows for multiple 
isolated environments, each with their own packages and versions. Using Conda helps to reduce interference between 
projects resulting from changes to global dependencies. Conda is widely used in the AI, ML, and data science fields. 
Conda is installed by following the instructions provided on its project site: https://www.conda.io/.

As at the time of writing, there are two flavours of Conda: Anaconda and Miniconda. The former is a complete 
distribution of roughly 1,500 scientific packages that have been curated and vetted for interoperability and 
usability. Miniconda is a minimal distribution without the bundled packages.

#### 5.7.2. Bazel (Build System)

Bazel is a cross-platform and open-source tool used to build and test multi-language and multi-platform projects. 
Bazel is installed by following the instructions provided on its project site: https://bazel.build/.

##### 5.7.2.1. Bazelisk

Bazelisk is a cross-platform and open-source tool used to wrap and launch Bazel. It automatically picks a good 
version of Bazel given your working directory, downloads it from the official servers (if needed), then runs Bazel 
passing through all command line arguments transparently. Bazelisk is installed by following the instructions 
provided on its project site: https://github.com/bazelbuild/bazelisk.

##### 5.7.2.2. Buildifier

Buildifier is a cross-platform and open-source tool used to format Bazel BUILD and .bzl files using a standard 
convention. Buildifier is installed by following the instructions provided on its project site: 
https://github.com/bazelbuild/buildtools/tree/master/buildifier.

#### 5.7.3. Git (Source Control)

Git is a cross-platform and open-source tool used for distributed version control. Git is installed by following the 
instructions provided on its project site: https://github.com/git-guides.

#### 5.7.4. Docker Desktop (Containerisation)

Docker Desktop is a cross-platform and open-source tool used to build and share containerised apps and services. 
Docker Desktop is installed by following the instructions provided on its project site:
https://docs.docker.com/desktop/.

> The use of Docker Desktop is vital for Windows users because the majority of industry AI/ML tools, models, 
> frameworks, and libraries are available on Linux. To host the IDE on Windows but execute the code in Linux. For 
> guidance, please see: https://docs.docker.com/desktop/windows/wsl/.

##### 5.7.4.1. Nvidia CUDA Drivers

The Nvidia CUDA Drivers allow GPU passthrough to Docker containers running on Windows 11. The Nvidia CUDA Drivers 
are installed by following the instructions provided on Nvidia’s developer site:
https://developer.nvidia.com/cuda/wsl.

> It is worthwhile to consider joining the Nvidia Developer Program for access to preview drivers, learning 
> resources, and advanced tools: https://developer.nvidia.com/.

##### 5.7.4.2. Nvidia CUDA Base Images

For access to the latest Nvidia CUDA base images, please visit: https://hub.docker.com/r/nvidia/cuda.

#### 5.7.5. Data Layer

Designing a data layer for an AI and ML solution is a complex topic that is beyond the scope of this guide. Assuming 
you’ve built a developer workstation that uses NVMe drives in a RAID-0 configuration, we have options. We could use 
files stored in the OS filesystem or install specific storage software.

The simplest solution would be to rely on the basic OS filesystem. More complex solutions include but are not 
limited to object storage services such as those provided by AWS, Azure, and Google Cloud; and distributed file 
systems such as the Hadoop Distributed File System (HDFS). Databases like MLDB as well as distributed cache 
technologies like Redis may also be used.

Much of the datasets ingested during training and fine-tuning for ML models tends to be in the Apache Parquet format.
That data is generally stored in files, which tend to be created and accessed using Petastorm. Further, the results 
of training and fine-tuning of ML models also tend to be stored within files. Accordingly, we will use the simplest 
solution for our Data Layer, the OS filesystem.

> Please note that the specific requirements for any solution’s data needs will vary based on many factors. In terms 
> of ML, the data layer requirements for training a new model vs fine-tuning an existing model vary greatly. The 
> reason for the variance is that training a new model is considerably more data-intensive than fine-tuning. 
> Similarly, running an AI that makes inferences from an existing model may have anything from quite modest data 
> layer needs to enterprise-grade needs. Such needs could depend on whether the AI runs on a single user’s device or 
> on servers intended to serve millions.

##### 5.7.5.1. Petastorm

Petastorm is a cross-platform and open-source data access library. Petastorm provides for single machine as well as 
distributed system training and evaluation of ML models directly from datasets within the Apache Parquet format. 
Petastorm is installed by following the instructions provided on its project site: https://petastorm.readthedocs.io/.

#### 5.7.6. AI/ML Layer

The AI/ML Layer provides for model training, fine-tuning, and inference capabilities using both CPU and GPU 
capabilities. Given current industry trends as at the time of writing, the most effective way to build the AI/ML 
Layer so that the resulting service can be containerised for deployment within Kubernetes, is to use gRPC. gRPC 
allows for native Python execution that is essential for running JAX, PyTorch, and TensorFlow functions that support 
training, fine-tuning, and inference capabilities for models.

##### 5.7.6.1. Nvidia CUDA Toolkit

Nvidia’s Compute Unified Device Architecture (CUDA) is a parallel computing platform and application programming 
interface (API). The CUDA Toolkit allows certain Nvidia GPUs to be used for general-purpose computing on GPUs (GPGPU)
. The CUDA Toolkit is installed by following the instructions provided on Nvidia’s developer site:
https://developer.nvidia.com/cuda-toolkit.

Once the CUDA Toolkit is installed, you may see a note indicating that certain integrated tools were not installed. 
Please refer to the URL provided by the installer for further information. In essence, the tools have been moved 
into a Visual Studio extension available within the Visual Studio Marketplace. At the time of writing, the tools 
have been bundled together under the title “NVIDIA Nsight Integration” and the bundle is offered in both 32- and 
64-bit. Please be sure to check that you’re downloading the correct extension by verifying that the author is listed 
as Nvidia (www.nvidia.com) within the Visual Studio Marketplace: https://marketplace.visualstudio.com/.

##### 5.7.6.2. JAX

JAX is a cross-platform and open-source combination of Autograd and XLA for high-performance, numerical computing. 
JAX provides a familiar API as well as transformations, and it runs on CPU, GPU, and TPU (cloud). Please make sure 
to install JAX for GPU. JAX is installed by following the instructions provided on its project site:
https://jax.readthedocs.io/.

##### 5.7.6.3. PyTorch

PyTorch is a cross-platform and open-source ML framework. PyTorch provides for distributed training and cloud 
support. In addition, PyTorch has a robust ecosystem. Please make sure to install PyTorch for GPU. PyTorch is 
installed by following the instructions provided on its project site: https://pytorch.org/.

##### 5.7.6.4. TensorFlow

TensorFlow is a cross-platform and open-source ML platform. TensorFlow provides for data preparation, model training 
and deployment, and MLOps. TensorFlow installs with GPU support by default. TensorFlow is installed by following the 
instructions provided on its project site: https://www.tensorflow.org/.

##### 5.7.6.5. Hugging Face Transformers

The Hugging Face Transformers are a cross-platform and open-source set of APIs and tools that enable the download 
and training of pretrained ML models. Using pretrained models reduces compute costs and saves on both time and 
energy as well as other resources. The Hugging Face Transformers are installed by following the instructions 
provided on its project site: https://huggingface.co/docs/transformers/.

##### 5.7.6.6. gRPC

gRPC is a cross-platform and open-source Remote Procedure Call (RPC) framework. gRPC efficiently connects services 
in and across datacentres with pluggable support for load balancing, tracing, health checking and authentication. 
gRPC supports streaming as well as bidirectional communication. It is also applicable in the last mile of 
distributed computing to connect devices, mobile applications, and browsers to backend services. gRPC is installed 
by following the instructions provided on its project site: https://grpc.io/.

Please note that gRPC supports multiple languages; however, we use the Python flavour of gRPC. We do so because we 
use gRPC to create a service layer that runs JAX, PyTorch, and TensorFlow functions that support training, 
fine-tuning, and inference capabilities for models.

#### 5.7.7. Web API Layer

The Web API Layer can be implemented several ways; however, for reasons of performance, security, scalability, 
manageability, cost, and developer productivity, only two alternatives are recommended. Said options are ASP.NET for 
C# developers and Micronaut for Java developers. Web APIs built using either option will integrate with the AI/ML 
Layer using auto-generated stubs provided by gRPC. To facilitate Client Layer development, OpenAPI/Swagger for API 
documentation and client auto-generation as well as JSON Web Token (JWT) for authentication and authorisation, are 
required.

#### 5.7.8. Client Layer

The Client Layer can be implemented several ways; however, for reasons of performance, security, scalability, 
manageability, cost, and developer productivity, only one approach per device type is recommended. For mobile 
devices, React Native is recommended. For web-enabled devices like laptops and desktops, ReactJS (we'll use Next.js, a 
ReactJS framework) is recommended. Please ensure that TypeScript is used because it attends to the challenges caused 
by JavaScript at scale. Clients built using either React Native or ReactJS will integrate with the Web API Layer 
using auto-generated stubs provided by the OpenAPI/Swagger toolchain. Authentication and authorisation will be 
provided by bearer tokens using JWT.

#### 5.7.9. Architecture

Using node pools and taints in Kubernetes, the AI/ML Layer, Web API Layer, and Client Layer can all be served with a 
single cluster. Using nodes with appropriate hardware for each workload allows for rapid communication between the 
Web API Layer and the AI/ML Layer via the internal Kubernetes network. Similarly, the Data Layer can be served by a 
high-performance shared volume within Kubernetes. Doing so allows all AI/ML Layer containers within a pod access the 
pretrained model, load it into memory, and provide inference.

Similarly, if training and fine-tuning are correctly coordinated and the data is stored using the Apache Parquet 
format, the shared volume is an effective solution. Supporting data such as user profiles, state management, etc. 
can easily be provided by a managed database service external to the cluster as needed.

Overall, the architecture used within this project should reflect a reasonably cost-efficient, performant, flexible, 
and scalable service that the author hopes is meaningfully instructive.

> Please note that the architecture considered can be extended to support high availability up to and including 99.
> 999%. By using shared volume and supporting data replication within a global deployment of geo-redundant clusters 
> and supporting services, such high availability can be achieved.

### 5.8. Next Steps

At this point you should have a fully built, fully installed, and fully configured developer workstation for AI and 
ML. Nice work! Our next steps will be to familiarise ourselves with the sources of datasets and pretrained models so 
that we can start with a functioning AI, learn about fine-tuning, and then get into training from scratch. Please do 
bear in mind that training from scratch is expensive to do correctly. While a self-built developer workstation can 
run modest experiments for training, any sophisticated training is likely best done in the cloud. Training in the 
cloud allows you to pay for what you use. While still expensive, it’s orders of magnitude more affordable than 
buying the hardware.

## 6. Sources of Datasets and Pretrained Models

Whether training from scratch, training the pretrained, or fine-tuning ML models, we need data. Thankfully, there is 
an abundance of data available to us from several sources.

### 6.1. Hugging Face

Hugging Face develops tools for building applications that use AI and ML. The company provides the Hugging Face 
Transformers library referenced in section 5.7.3.5 within this guide. Hugging Face also provides a platform that 
allows people to share datasets and models for ML. Hugging Face can be accessed at its site: https://huggingface.co/.

Hugging Face’s publicly available datasets can be found here: https://huggingface.co/datasets.

### 6.2. Kaggle

Kaggle is a Google company that provides an online community data science, AI, and ML practitioners. Kaggle provides 
an online space for community members to share code, datasets, and models. Courses are also provided to help people 
learn. Kaggle can be accessed at its site: https://www.kaggle.com/.

- Kaggle’s publicly available code can be found here: https://www.kaggle.com/code.
- Kaggle’s publicly available datasets can be found here: https://www.kaggle.com/datasets.
- Kaggle’s publicly available models can be found here: https://www.kaggle.com/models.

### 6.3. OpenML

OpenML is a worldwide ML lab that makes machine learning research easily accessible and reusable. OpenML is an open 
platform for sharing datasets, algorithms, and experiments so that we can learn how to learn, together. OpenML can 
be accessed at its site: https://www.openml.org/.

### 6.4. Next Steps

If you haven’t already done so, take a look at the various sources and register where you feel comfortable so that 
you can gain access to resources. Please take some time to look around, see what’s available, and familiarise 
yourself with the various communities. Please remember to be courteous and respectful when dealing with others. Many 
experts give freely of their time to help others, which help those experts are under no obligation to provide.

With your developer workstation as well as access to datasets, code, courses, and models set up, you’re ready to 
start building an AI/ML app. To get you started, I’ve provided code on GitHub: 
https://github.com/SebGSX/AI-ML-Bootstrap, the code is in the same repo as this guide. Don’t forget to review the 
literature section in this guide for detailed information. Good luck with your journey!

## 7. Foundational Literature

In addition to the many courses available online such as those provided by Microsoft, Amazon, Google, HuggingFace, 
DeepLearning.ai, Kaggle, etc., the following foundational literature is highly recommended.

### 7.1. Foundations of Machine Learning and Deep Learning

- **Research Papers**
  - *Learning Representations by Backpropagating Errors*, Rumelhart, D., Hinton, G., & Williams, R. Learning
    representations by back-propagating errors. *Nature* **323**, 533–536 (1986). https://doi.org/10.1038/323533a0.
  - *Long short-term memory*, Hochreiter, S., & Schmidhuber, J. Long short-term memory. *Neural Computation*
    **9(8)**, 1735–1780 (1997). https://doi.org/10.1162/neco.1997.9.8.1735.
  - *Efficient Estimation of Word Representations in Vector Space*, Mikolov, T., Chen, K., Corrado, G., & Dean, J.
    Efficient estimation of word representations in vector space. *arXiv:1301.3781* (2013).
    https://doi.org/10.48550/arXiv.1301.3781.
- **Books**
  - *Linear Algebra Done Right* (3rd Edition) by Axler (2024)
  - *Deep Learning* by Goodfellow, Bengio, & Courville (2016)
  - *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow* (3rd Edition) by Géron (2022)
  - *Understanding Deep Learning* by Prince (2023)

### 7.2. Transformers

- **Research Papers**
  - *Attention Is All You Need*, Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., 
    Kaiser, L., & Polosukhin, I. Attention is all you need. *arXiv:1706.03762* (2017). 
    https://doi.org/10.48550/arXiv.1706.03762.
  - *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*, Devlin, J., Chang, M.,
    Lee, K., & Toutanova, K. BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.
    *arXiv:1810.04805* (2018). https://doi.org/10.48550/arXiv.1810.04805.
  - *Improving Language Understanding by Generative Pre-Training*, Radford, A., & Narasimhan, K. Improving
    Language Understanding by Generative Pre-Training. *OpenAI* (2018). 
    https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf.
  - *Language Models are Unsupervised Multitask Learners*, Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & 
    Sutskever, I. Language Models are Unsupervised Multitask Learners. *OpenAI* (2019). 
    https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf.
  - *Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer*, Raffel, C. et al. Exploring 
    the Limits of Transfer Learning with a Unified Text-to-Text Transformer. *J. Mach. Learn. Res.* **21**, 
    140:1-140:67 (2019). https://doi.org/10.48550/arXiv.1910.10683.
  - *Language Models are Few-Shot Learners*, Brown, T.B. et al. Language Models are Few-Shot Learners. 
    *arXiv:2005.14165* (2020). https://doi.org/10.48550/arXiv.2005.14165.
- **Books**
  - *Transformers for Natural Language Processing* by Tunstall, von Werra, & Wolf (2022)

### 7.3. Scaling and Training Dynamics

- **Research Papers**
  - *Scaling Laws for Neural Language Models*, Kaplan, J., McCandlish, S., Henighan, T.J., Brown, T.B., Chess, B., 
    Child, R., Gray, S., Radford, A., Wu, J., & Amodei, D. Scaling Laws for Neural Language Models. 
    *arXiv:2001.08361* (2020). https://doi.org/10.48550/arXiv.2001.08361.
  - *Scaling Language Models: Methods, Analysis & Insights from Training Gopher*, Rae, J.W. et al. Scaling Language 
    Models: Methods, Analysis & Insights from Training Gopher. * arXiv:2112.11446* (2021). 
    https://doi.org/10.48550/arXiv.2112.11446.
  - *PaLM: Scaling Language Modeling with Pathways*, Chowdhery, A. et al. PaLM: Scaling Language Modeling with 
    Pathways. *arXiv:2204.02311* (2022). https://doi.org/10.48550/arXiv.2204.02311.
  - *Training Compute-Optimal Large Language Models*, Hoffmann, J. et al. Training Compute-Optimal Large Language 
    Models. *arXiv:2203.15556* (2022). https://doi.org/10.48550/arXiv.2203.15556.

### 7.4. Fine-tuning and Alignment

- **Research Papers**
  - *Fine-Tuning Language Models from Human Preferences*, Ziegler, D.M., Stiennon, N., Wu, J., Brown, T.B., 
    Radford, A., Amodei, D., Christiano, P., & Irving, G. Fine-Tuning Language Models from Human Preferences.
    *arXiv:1909.08593* (2019). https://doi.org/10.48550/arXiv.1909.08593.
  - *Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models*, Srivastava, A. et 
    al. Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models. 
    *arXiv:2206.04615* (2022). https://doi.org/10.48550/arXiv.2206.04615.
  - *Training language models to follow instructions with human feedback*, Ouyang, L. et al. Training language models 
    to follow instructions with human feedback. *arXiv:2203.02155* (2022). https://doi.org/10.48550/arXiv.2203.02155.

### 7.5. Prompt Engineering

- **Research Papers**
  - *A Prompt Pattern Catalog to Enhance Prompt Engineering with ChatGPT*, White, J., Fu, Q., Hays, S., Sandborn, M., 
    Olea, C., Gilbert, H., Elnashar, A., Spencer-Smith, J., & Schmidt, D.C. A Prompt Pattern Catalog to Enhance Prompt 
    Engineering with ChatGPT. *arXiv:2302.11382* (2023). https://doi.org/10.48550/arXiv.2302.11382.

## 8. Mechanical Sympathy

Given compute-intensive nature of AI and ML, the author cannot over-emphasise the importance of good mechanical 
sympathy on the part of developers. Understanding modern computing at a deep level and being able to code in 
Assembly are useful skills especially when optimising code written in C/C++, C#, or Java. When using intrinsics to 
provide direct access to some instructions, mechanical sympathy becomes vital.

Accordingly, the book entitled The Elements of Computing Systems, second edition: Building a Modern Computer from 
First Principles by Noam Nisan and Shimon Schocken is highly recommended.
