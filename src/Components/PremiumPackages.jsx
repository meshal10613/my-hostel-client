import React from "react";
import "./PremiumPackages.css";
import { Link } from "react-router";

const PremiumPackages = () => {
    const packages = [
        {
            id: 1,
            name: "Silver",
            price: 2999,
            benefits: [
                "1️⃣ 2 Meals / Day",
                "2️⃣ Basic Support",
                "3️⃣ Access to Daily Menu",
            ],
            logo: "https://i.ibb.co.com/LhRLy4Bt/1.png",
            location: "silver",
        },
        {
            id: 2,
            name: "Gold",
            price: 3999,
            benefits: [
                "1️⃣ 3 Meals / Day",
                "2️⃣ Basic Support",
                "3️⃣ Access to Daily Menu",
            ],
            logo: "https://i.ibb.co.com/MDZT9JXf/2.png",
            location: "gold",
        },
        {
            id: 3,
            name: "Platinum",
            price: 4999,
            benefits: [
                "1️⃣ 3 Meals / Day",
                "2️⃣ 3 Basic Support",
                "3️⃣ Access to Daily Menu",
            ],
            logo: "https://i.ibb.co.com/60Tyy732/3.png",
            location: "platinum",
        },
    ];

    return (
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center">
                Choose Your Perfect{" "}
                <span className="text-[#FFAE00] mb-3">Meal Package</span>
            </h2>
            <p className="text-gray-500 text-center mb-3">
                Choose from our Silver, Gold, or Platinum packages and enjoy
                flexible daily meal options designed to fit your routine and
                budget.
            </p>
            <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {packages.map((p) => (
                    <div key={p.id} className="card mx-auto">
                        {/* <svg
                            className="img"
                            xmlns="http://www.w3.org/2000/svg"
                            xml:space="preserve"
                            width="100%"
                            height="100%"
                            version="1.1"
                            shape-rendering="geometricPrecision"
                            text-rendering="geometricPrecision"
                            image-rendering="optimizeQuality"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            viewBox="0 0 784.37 1277.39"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                            <g id="Layer_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                                <g id="_1421394342400">
                                    <g>
                                        <polygon
                                            fill="#343434"
                                            fill-rule="nonzero"
                                            points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"
                                        ></polygon>
                                        <polygon
                                            fill="#8C8C8C"
                                            fill-rule="nonzero"
                                            points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"
                                        ></polygon>
                                        <polygon
                                            fill="#3C3C3B"
                                            fill-rule="nonzero"
                                            points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"
                                        ></polygon>
                                        <polygon
                                            fill="#8C8C8C"
                                            fill-rule="nonzero"
                                            points="392.07,1277.38 392.07,956.52 -0,724.89"
                                        ></polygon>
                                        <polygon
                                            fill="#141414"
                                            fill-rule="nonzero"
                                            points="392.07,882.29 784.13,650.54 392.07,472.33"
                                        ></polygon>
                                        <polygon
                                            fill="#393939"
                                            fill-rule="nonzero"
                                            points="0,650.54 392.07,882.29 392.07,472.33"
                                        ></polygon>
                                    </g>
                                </g>
                            </g>
                        </svg> */}
                        <img src={p.logo} alt={p.location} className="img" />
                        <div className="textBox">
                            <p className="text head text-black">
                                ৳ <span>{p.price}</span>
                            </p>
                            <ul className="text-black">
                                {p.benefits.map((s) => (
                                    <li key={s}>{s}</li>
                                ))}
                            </ul>
                            <Link
                                to={`/checkout/${p.location}`}
                                type="submit"
                                className="btn bg-gradient-to-r from-[#FFAE00] to-[#FF8A00] text-white border-none"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumPackages;
