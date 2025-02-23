"use client";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const [output, setOutput] = useState([]); // Initialize as an empty array

  const validateGitHubRepoLink = (url) => {
    // Regex to match a valid GitHub repo URL
    const githubRepoRegex =
      /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/;
    return githubRepoRegex.test(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const repoLink = formData.get("repo-link");
    const numBullets = formData.get("num-bullets");
    const context = formData.get("context");

    // Validate the GitHub repo link
    if (!validateGitHubRepoLink(repoLink)) {
      setError("Please enter a valid GitHub repository link.");
      return;
    }

    // Clear any previous errors
    setError("");

    // Create dummy JSON data for bullet points
    const dummyBulletPoints = [
      {
        id: 1,
        text: `This is the first bullet point for the repository: ${repoLink}.`,
      },
      {
        id: 2,
        text: `This is the second bullet point with additional context: ${
          context || "No context provided"
        }.`,
      },
    ];

    console.log(
      `Repo link: ${repoLink} --- # Bullet Pints: ${numBullets} --- Context: ${
        context ? context : "No context"
      }`
    );
    // Set the output to the dummy JSON data
    setOutput(dummyBulletPoints);

    // Clear the form fields
    event.target.reset();
  };

  return (
    <div className="bg-gray-300 p-24 flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="repo-link">Repo Link:</label>
        <input type="text" id="repo-link" name="repo-link" required />
        {error && <p className="text-red-500">{error}</p>}

        <label htmlFor="num-bullets">Choose a # of Bullet Points:</label>
        <select id="num-bullets" name="num-bullets" required>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="context">Extra Context:</label>
        <textarea id="context" name="context"></textarea>

        <input type="submit" value="Submit" />
      </form>

      {/* Display the output */}
      {output.length > 0 && (
        <div className="mt-8 p-4 bg-white rounded shadow">
          <h3 className="font-bold mb-2">Output:</h3>
          <ul>
            {output.map((bullet) => (
              <li key={bullet.id} className="mb-2">
                - {bullet.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
