import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        Privacy Policy
      </h1>

      <div className="prose prose-invert prose-purple max-w-none">
        <p className="text-sm text-gray-400">Last updated: April 19, 2025</p>

        <h2>Introduction</h2>
        <p>
          SpaceExplorer ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <p>
          Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
          do not access the site.
        </p>

        <h2>Information We Collect</h2>

        <h3>Personal Data</h3>
        <p>When you use our website, we may collect the following personal information:</p>
        <ul>
          <li>
            <strong>Account Information:</strong> If you create an account, we collect your name, email address, and
            password.
          </li>
          <li>
            <strong>User Contributions:</strong> Any content you contribute to the platform, including comments,
            articles, or forum posts.
          </li>
          <li>
            <strong>Communication Data:</strong> If you contact us directly, we may collect additional information such
            as your name, email address, and the contents of your message.
          </li>
        </ul>

        <h3>Usage Data</h3>
        <p>We may also collect information about how you use our website:</p>
        <ul>
          <li>
            <strong>Log Data:</strong> Information that your browser sends whenever you visit our website, such as your
            IP address, browser type, pages visited, time spent on pages, and other statistics.
          </li>
          <li>
            <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track
            activity on our website and hold certain information.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you about updates, security alerts, and support</li>
          <li>Send you newsletters if you have subscribed</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2>Disclosure of Your Information</h2>
        <p>We may share your information in the following situations:</p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
            providers, contractors, or agents who perform services for us.
          </li>
          <li>
            <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during
            negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our
            business.
          </li>
          <li>
            <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your
            consent.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in
            response to valid requests by public authorities.
          </li>
        </ul>

        <h2>Your Data Protection Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>The right to access the personal information we have about you</li>
          <li>The right to request correction of inaccurate personal information</li>
          <li>The right to request deletion of your personal information</li>
          <li>The right to object to processing of your personal information</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the
          security of any personal information we process. However, please also remember that we cannot guarantee that
          the internet itself is 100% secure.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal
          information from children under 13.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>
          <a href="mailto:privacy@spaceexplorer.com" className="text-purple-400 hover:text-purple-300">
            privacy@spaceexplorer.com
          </a>
        </p>
      </div>
    </div>
  )
}
