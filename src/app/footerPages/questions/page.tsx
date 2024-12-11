import React from 'react';

const QandAPage = () => {
  const faqs = [
    {
      question: 'How can I reset my password?',
      answer: 'Go to the login page and click "Forgot Password."',
    },
    {
      question: 'Can I change my budget settings?',
      answer: 'Yes, visit the settings page to adjust your budget categories.',
    },
  ];

  return (
    <div className="page">
      <h1>Questions and Answers</h1>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <strong>Q: {faq.question}</strong>
            <br />
            A: {faq.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QandAPage;
