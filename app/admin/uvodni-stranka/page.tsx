"use client"

import React, { useState } from 'react';
import { PageHeader } from "../_components/admin-page-nav";

export default function LandingPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerate = () => {
        // Simulate content generation
        setGeneratedContent(`Generated Content: ${content}`);
    };

    return (
        <>
            <PageHeader>Úvodní stránka</PageHeader>
            <p className="font-light italic pb-4"> Rychlé a přehledné generování úvodní stránky</p>

            <div className="mx-auto mt-6">
                <div className="bg-white shadow-md border border-black/20 rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">AI generovaná úvodní stránka</h2>
                    <p className="mb-4">Nakonfiguruj si úvodní stránku rychle a efektivně.</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Hlavní nadpis</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
                            placeholder="Vložte titulek"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Obsah</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={12}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
                            placeholder="Vložte příkaz pro vygenerování jednoduché úvodní stránky"
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Generate
                    </button>
                </div>
                {generatedContent && (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Preview:</h3>
                        <div className="font-light italic">{generatedContent}</div>
                    </div>
                )}
            </div>
        </>
    );
}
