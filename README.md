CSCI5409 Cloud ComputingTerm Assignment Report




**Vatsal Jain**

**B00924756**



**CSCI5409 Cloud Computing**

**Term Assignment Report**



<b>01<sup>st</sup> August 2023</b>








**Introduction:**

I built a cloud-based system designed to provide individual users with a secure and user-friendly platform for file storage. The system allows users to signup for accounts, log in to their accounts, upload their files, and subsequently download them when needed. Uploaded files are automatically deleted on the expiry date.

The system offers a seamless user experience, empowering individuals to store and access their files from anywhere with an internet connection. By using the power of cloud computing, the platform ensures high availability and scalability, enabling users to store various file types without worrying about device limitations. Overall, the system aims to provide a practical and feature-rich cloud-based file storage solution, showcasing the potential of cloud computing technologies.

**How I met the menu item requirements?**

For my Cloud Computing Term Assignment, I did a careful analysis and selected a set of cloud services from the provided menu to design and implement my system. The services I chose and the reasons for their selection are as follows:

**1. Compute:**

**AWS Elastic Beanstalk**: 

AWS Elastic Beanstalk is a Platform as a Service (PaaS) that simplifies the deployment and management of applications. With Elastic Beanstalk, I hosted the frontend of my system. It abstracts the complexity of underlying AWS resources, such as EC2 instances and Elastic Load Balancers, while providing configuration options for customizing the application environment.

AWS Elastic Beanstalk is a higher-level abstraction of AWS EC2, providing automated deployment, load balancing, and scaling for web applications. EC2, on the other hand, offers more flexibility and control, allowing direct access to virtual machines for fine-grained customization. I chose Elastic Beanstalk for its simplicity [1].

**AWS Lambda:** 

AWS Lambda is a serverless compute service that enables running code in response to events without the need to manage servers. I used Lambda to handle various serverless functions in my system, such as user authentication, file upload, file download, and other backend operations. With Lambda, I configured triggers, such as API Gateway requests and Event Bridge rules, to execute the functions. Lambda's auto-scaling capability ensures that resources are provisioned only when needed, resulting in cost-effective execution of functions [2].

AWS Lambda is ideal for event-driven functions. AWS Step Functions, on the other hand, enables building complex workflows by orchestrating multiple Lambda functions. To build this system, I selected Lambda due to its versatility and suitability for handling individual operations. Although Step Functions could have facilitated more advanced workflows, its complexity was unnecessary for my straightforward use case [9].

**2. Storage:**

**AWS S3:** 

Amazon Simple Storage Service (S3) is an object storage service designed for secure and scalable storage of any type of data, including files and documents. I utilized S3 to store all the uploaded files in my system securely. S3 provides high durability and availability by replicating data across multiple data centers, reducing the risk of data loss. It also offers various features for enhancing the security and integrity of stored files [3].

**AWS DynamoDB:** 

DynamoDB is a fully managed NoSQL database service offered by AWS. It provides a highly available and scalable database solution for applications that require low-latency access to data. I utilized DynamoDB to store user details, such as emails and passwords, and to manage information about the uploaded files, including their metadata and expiration dates [4]. 

DynamoDB's serverless nature and flexible data model allowed me to handle varying workloads efficiently. Although AWS Aurora is a powerful option, its high cost and complexity were not justified for this project's database needs [4].

**3. Network:**

**AWS API Gateway:** 

AWS API Gateway is a fully managed service that enables the creation, deployment, and management of APIs at scale. I used API Gateway to expose HTTP endpoints for user authentication, file upload, and file download Lambda functions in my system. API Gateway facilitated request and response transformations, enabling seamless integration with Lambda functions [5].

AWS API Gateway is a fully managed service for creating APIs, while VPC offers a private network for internal services. I selected API Gateway for its simplicity and seamless integration with Lambda functions, enabling secure communication between frontend and backend. I did not go with VPC and CloudFront as I felt that they were not required for my system’s specific use case.

**4. General:**

**AWS EventBridge:** 

I utilized EventBridge to build an event-driven architecture for my system. By defining rules that trigger specific actions based on events, such as file expiration events from DynamoDB, I could automatically initiate file deletions using Lambda functions. This decoupling of services promotes flexibility and scalability in the system design [6].

**AWS SNS:** 

Amazon Simple Notification Service (SNS) is a fully managed pub/sub messaging service that enables the delivery of messages to multiple recipients. In my system, SNS was employed to send email notifications to users for various events, such as successful file uploads or file deletions. By defining filter policies, I could target specific users with personalized notifications, enhancing communication [7].

An alternative service available in AWS is Simple Email Service (not present in the menu), which serves as an email-sending platform. While SES allows targeted individual emails to affected customers, it requires more involved setup compared to SNS (Simple Notification Service). To use SES, users need to request support access for sending emails and handle aspects like bounces, concurrency, and email errors. On the other hand, SNS offers a simpler process by creating a topic and adding subscribers, making it a more straightforward option for managing notifications and messaging [8].

**Delivery model for this system:**

For my cloud-based file management system, I adopted a **hybrid (PaaS + FaaS)** deployment model, utilizing both AWS Elastic Beanstalk and AWS Lambda, each serving different parts of the application.

- **AWS Elastic Beanstalk for Frontend Hosting:**

I chose AWS Elastic Beanstalk for hosting the frontend of my application. Elastic Beanstalk is a **Platform as a Service (PaaS)** offering that abstracts the underlying infrastructure complexities. Elastic Beanstalk simplifies deployment by automatically provisioning resources like EC2 instances and load balancers, allowing focused frontend development without infrastructure setup distractions. Its automatic scaling optimizes frontend resource utilization and responsiveness during traffic spikes. Elastic Beanstalk provides built-in monitoring and health checks for frontend performance and quick issue response.

- **AWS Lambda for Backend APIs:**

For the backend APIs, I chose AWS Lambda Functions configured with API Gateway. Lambda is a **Function as a Service (FaaS)** offering that allows running code in response to events without the need to manage servers. Lambda enables a serverless architecture, reducing operational overhead, automatically scaling based on requests, and saving costs during low-traffic periods. Lambda functions enable event-driven backend APIs, seamlessly integrating with AWS services, triggered by events like API Gateway requests or EventBridge Rules. Its pay-as-you-go pricing charges only for actual compute time, making it a cost-effective backend choice. 

**Deployment model for this system:**

For the delivery model of my file storage system, I chose the **Public Cloud** delivery model, specifically utilizing Amazon Web Services. The decision to use the Public Cloud is based on several compelling reasons that align with the project's objectives and requirements:

**Scalability and Flexibility:** The Public Cloud offers unparalleled scalability, allowing my system to effortlessly accommodate fluctuations in user demand. With AWS's auto-scaling capabilities, resources are automatically adjusted based on workload, ensuring optimal performance and cost efficiency.

**Pay-as-You-Go Pricing:** AWS follow a pay-as-you-go pricing model. This cost-effective approach allows me to scale resources up or down based on demand, reducing overhead costs, and ensuring efficient resource utilization.

**High Availability and Reliability:** AWS's Public Cloud architecture is designed for high availability and reliability. My file management system benefits from AWS's redundant infrastructure and automatic failover mechanisms, minimizing downtime and providing users with consistent access to their files.

**Security and Compliance:** AWS invests heavily in ensuring the security and compliance of its Public Cloud infrastructure. By leveraging AWS's robust security features, such as encryption at rest and in transit, and security certifications, I can maintain a secure environment for user data.

**Ease of Deployment and Management:** Utilizing the Public Cloud, especially AWS, simplifies the deployment and management of my system. AWS's managed services, such as AWS Elastic Beanstalk and AWS Lambda, abstract away infrastructure complexities.

**Backup and Disaster Recovery:** AWS provides robust backup and disaster recovery solutions, enabling me to implement data backup strategies and replicate data across different regions for data redundancy and disaster recovery purposes.

By leveraging the capabilities of the Public Cloud, I can focus on innovation and application development while ensuring a seamless experience for the system's users.

**Final Architecture:**

The final architecture of this system uses a combination of AWS cloud mechanisms. The frontend of the application is hosted on AWS Elastic Beanstalk, which automatically provisions and manages the necessary resources. The backend APIs are implemented as serverless functions using AWS Lambda integrated with AWS API Gateway, allowing for automatic scaling.

Data (user details and file metadata) is stored using AWS DynamoDB. The uploaded files are stored in AWS S3. AWS EventBridge is utilized to trigger the deletion of files on expiry, ensuring automatic file management.

The application's frontend is developed using ReactJS, HTML and CSS, while the backend functionality is implemented using lambda functions written in Node.js for its simplicity and versatility. AWS SDKs are used in the backend code to interact with various AWS services and perform operations like file uploads, database queries, and sending notifications.

Deployment to the cloud is accomplished using an AWS CloudFormation script, enabling the automated provisioning and configuration of the required cloud resources. The CloudFormation templates makes it easy to replicate and manage the deployment.

![A diagram of a block diagram

Description automatically generated](Aspose.Words.125e9c26-d6e7-44ce-9787-636480dcbbd7.001.png)

**Figure 1:** Cloud Formation Template** 

To build this file storage system, I have used the Dynamic Scalability Architecture to ensure efficient workload distribution and automatic scaling based on changing demands. With the use of AWS Elastic Beanstalk for the frontend and AWS Lambda for the backend APIs, the system can dynamically scale both horizontally and vertically. During periods of high traffic, the automated scaling listener enables the system to scale out by provisioning additional instances to handle the load. While implementing the Dynamic Scalability Architecture introduces some complexities and requires careful monitoring, it provides huge cost savings and enables the application to handle various situations effectively.

![A diagram of a software application

Description automatically generated](Aspose.Words.125e9c26-d6e7-44ce-9787-636480dcbbd7.002.png)

**Figure 2:** Architecture Diagram** 

**Analysis of security:**

The security approach implemented in this system focused on protecting data at every stage, ensuring confidentiality, integrity, and availability. This security strategy addressed data protection both in transit and at rest, using various AWS services to overcome potential risks.

- **Data in Transit:**

To secure data during transmission between the frontend and backend components, I implemented the following measures:

AWS API Gateway Security: API Gateway's built-in features, such as request validation and throttling, were used to prevent unauthorized access and protect against potential XML parser exploits, SQL injection and DDoS attacks. These security controls helped in maintaining the availability and stability of the API.

- **Data at Rest:**

To protect data stored in AWS services, including S3 and DynamoDB, I applied the following security measures:

S3 Data Security: The S3 bucket used in this system is blocked for Public Access and hence it does not allow unauthorized access. It also has various encryption features that adds to the security.

DynamoDB Encryption: For protecting sensitive user details and file metadata, DynamoDB provides default encryption at rest. This feature secures data at the storage layer, mitigating risks associated with unauthorized access to the database.

- **Enhancements that can be made to improve the security:**

To secure data during transmission, we can enforce HTTPS encryption using SSL/TLS protocols between the frontend and backend components. This safeguards the data exchange between client and server, preventing attacks like eavesdropping and man-in-the-middle.

Data stored in S3 can be protected using Server-Side Encryption, ensuring files stored in S3 buckets are automatically encrypted.

I can also implement user authentication using Amazon Cognito to provide a secure way to manage user sign-up and login processes.

**Setup required to reproduce this system in a private cloud:**

To reproduce the mentioned architecture of the cloud-based file storage system in a private cloud while maintaining a relatively similar level of availability, the organization would need to invest in a combination of hardware, software, and networking components. 

Here is an estimate of the components that might be required:

1. Hardware Infrastructure: The organization would need to buy physical servers to run the application. The number of servers required would depend on the expected user traffic. Additionally, storage devices would be necessary for file storage.
1. Networking Equipment: High-performance network devices would be essential for creating a robust and secure network infrastructure. Load balancers would also be required for distributing incoming traffic across multiple servers.
1. Database System: A DBMS would be necessary for user and file metadata storage. 
1. Monitoring and Logging Tools: To monitor system health and track activities, the organization would need monitoring and logging.
1. Security Tools: Comprehensive security solutions, including firewalls and antivirus software, would be required to protect the private cloud infrastructure from cyber threats.
1. Disaster Recovery Solutions: Robust backup and disaster recovery solutions would be essential to ensure data redundancy and recovery in case of system failures.
1. Subject-matter experts: The organization might need to hire IT experts and consultants to design, implement, and maintain the private cloud infrastructure.

For a basic private-cloud infrastructure to reproduce the file storage system, the cost could be in the range of $60,000 to $70,000. However, the actual cost could vary depending on specific hardware and software choices, as well as additional operational expenses.


**Cloud mechanism that requires the most monitoring:**

Being a Function as a Service (FaaS) offering, AWS Lambda automatically scales to handle varying workloads, which can result in increased costs if not closely monitored. Lambda functions are billed based on the number of requests, duration, and memory allocated (pay-as-you-go), so its inefficient use could lead to significant cost escalation. Use of AWS CloudWatch can help identify any unexpected increase in usage. 

**Scope of evolution of this application:**

**Enhance user authentication:** AWS Cognito can be used to manage secure login and signup process.

**Multi-factor Authentication (MFA):** Implementing MFA would add an extra layer of security to user accounts. AWS Cognito supports MFA using SMS, email, or authenticator apps.

**File Sharing with Expiry:** Enabling file sharing with time-limited access could be accomplished using AWS S3 pre-signed URLs set for a certain period.

**File Encryption at Upload:** Implementing client-side encryption for files before uploading to AWS S3 using AWS Key Management Service (KMS) would protect data even before it reaches the server.

**Data Archiving:** Introducing long-term archiving to Amazon Glacier for infrequently accessed files, ensuring cost-effectiveness.

**References:**

[1]	Tutorial: Schedule AWS lambda functions using CloudWatch Events, https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html (accessed Jul. 26, 2023). 

[2] 	D. Musgrave, “Lambda,” Amazon, https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html (accessed Jul. 26, 2023). 

[3] 	“S3,” Amazon, https://aws.amazon.com/s3/ (accessed Aug. 1, 2023). 

[4] 	D. Rangel, “DynamoDB: Everything you need to know about Amazon Web Service’s NoSQL database,” Amazon, https://aws.amazon.com/dynamodb/ (accessed Aug. 1, 2023). 

[5] 	“X.400 gateway API specification ; X.400 API Associations,” Amazon, https://aws.amazon.com/api-gateway/ (accessed Aug. 1, 2023). 

[6] 	C. Rivas, “Using Slack and AWS EventBridge to automate your devops tasks,” Amazon, https://aws.amazon.com/eventbridge/ (accessed Aug. 1, 2023). 

[7] 	R. Treichler and C. Hardmeier, “Schlagwortnormdatei Schweiz für Allgemeine öffentliche Bibliotheken: SNS,” Amazon, https://aws.amazon.com/sns/ (accessed Aug. 1, 2023). 

[8] 	T. Sallai, “How to target subscribers in an SNS topic,” Sitewide ATOM, https://advancedweb.hu/how-to-target-subscribers-in-an-sns-topic/ (accessed Aug. 1, 2023). 

[9] 	“Step functions,” Amazon, https://aws.amazon.com/step-functions/ (accessed Aug. 1, 2023). 




B00924756		2
