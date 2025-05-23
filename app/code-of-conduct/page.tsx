import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CodeOfConductPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Code of Conduct
      </h1>

      <div className="prose prose-invert prose-purple max-w-none">
        <h2>Our Pledge</h2>
        <p>
          In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to
          make participation in our project and our community a harassment-free experience for everyone, regardless of
          age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality,
          personal appearance, race, religion, or sexual identity and orientation.
        </p>

        <h2>Our Standards</h2>
        <p>Examples of behavior that contributes to creating a positive environment include:</p>
        <ul>
          <li>Using welcoming and inclusive language</li>
          <li>Being respectful of differing viewpoints and experiences</li>
          <li>Gracefully accepting constructive criticism</li>
          <li>Focusing on what is best for the community</li>
          <li>Showing empathy towards other community members</li>
        </ul>

        <p>Examples of unacceptable behavior by participants include:</p>
        <ul>
          <li>The use of sexualized language or imagery and unwelcome sexual attention or advances</li>
          <li>Trolling, insulting/derogatory comments, and personal or political attacks</li>
          <li>Public or private harassment</li>
          <li>
            Publishing others' private information, such as a physical or electronic address, without explicit
            permission
          </li>
          <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
          <li>Spreading misinformation or pseudoscientific claims</li>
        </ul>

        <h2>Our Responsibilities</h2>
        <p>
          Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to
          take appropriate and fair corrective action in response to any instances of unacceptable behavior.
        </p>
        <p>
          Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki
          edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or
          permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or
          harmful.
        </p>

        <h2>Scope</h2>
        <p>
          This Code of Conduct applies both within project spaces and in public spaces when an individual is
          representing the project or its community. Examples of representing a project or community include using an
          official project e-mail address, posting via an official social media account, or acting as an appointed
          representative at an online or offline event.
        </p>

        <h2>Scientific Integrity</h2>
        <p>
          As a platform dedicated to space science education, we have additional standards regarding scientific content:
        </p>
        <ul>
          <li>Content must be based on peer-reviewed scientific research or established scientific consensus</li>
          <li>Speculation must be clearly labeled as such</li>
          <li>Sources should be cited whenever possible</li>
          <li>Corrections should be made promptly when errors are identified</li>
        </ul>

        <h2>Enforcement</h2>
        <p>
          Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project
          team at conduct@spaceexplorer.com. All complaints will be reviewed and investigated and will result in a
          response that is deemed necessary and appropriate to the circumstances. The project team is obligated to
          maintain confidentiality with regard to the reporter of an incident.
        </p>

        <h2>Attribution</h2>
        <p>
          This Code of Conduct is adapted from the{" "}
          <a
            href="https://www.contributor-covenant.org"
            className="text-purple-400 hover:text-purple-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contributor Covenant
          </a>
          , version 1.4, available at{" "}
          <a
            href="https://www.contributor-covenant.org/version/1/4/code-of-conduct.html"
            className="text-purple-400 hover:text-purple-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.contributor-covenant.org/version/1/4/code-of-conduct.html
          </a>
        </p>
      </div>
    </div>
  )
}
