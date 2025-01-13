import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="bg-dark-blue text-white p-4 text-center">
            <p className="text-base font-medium">
                <strong>Contact</strong>
            </p>
            <p className="text-sm">
                General/Registration: <a href="mailto:contact@nzpmc.com" className="text-gray-400 no-underline">contact@nzpmc.com</a>
            </p>
            <p className="text-sm">
                Business/Partnership: <a href="mailto:business@nzpmc.com" className="text-gray-400 no-underline">business@nzpmc.com</a>
            </p>
            <p className="text-xs mt-2 text-gray-400">
                © 2024 Copyright: abcdf
            </p>
        </div>
    );
}

export default Footer;