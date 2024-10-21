"use client";

import { useRef, useState } from 'react';

// Framer Motion
import { motion } from 'framer-motion';

// Define fadeIn animation variant
const fadeIn = (direction = 'up', delay = 0) => {
    return {
        hidden: { opacity: 0, y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                duration: 0.8,
                delay,
            },
        },
    };
};

// Tiny MCE
import { Editor } from '@tinymce/tinymce-react';

const HTMLEditor = () => {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');

    return (
        <section className="section h-[1300px] xsm:h-[1200px] sm:h-full xl:h-[1000px] bg-[#fff] flex items-center" id="htmleditor">
            <div className="container mx-auto">
                <motion.h2
                    variants={fadeIn('down', 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.6 }}
                    className="h2 text-center"
                >
                    HTML Editor - Free Web Component Composer
                </motion.h2>

                <motion.p
                    variants={fadeIn('down', 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.6 }}
                    className="max-w-[800px] text-center mx-auto mb-5"
                >
                    Welcome to our free web content composer...
                </motion.p>

                <motion.div
                    variants={fadeIn('right', 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.6 }}
                >
                    <div className='mt-12'>
                        {/* TINY MCE */}
                        <Editor
                            apiKey='ugpif1xaemsbpzdfpee66fiqkz9hxh4ywls65tnnhw1hbobt'
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                plugins: [
                                    'code', // Plugin for source code view
                                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                    'checklist', 'mediaembed', 'advcode', 'export', 'a11ychecker', 'advtemplate',
                                ],
                                toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code', // Added 'code' to toolbar
                                menubar: 'file edit view insert format tools table help',
                                height: 500,
                            }}
                            value={content}
                            onEditorChange={(newContent) => setContent(newContent)}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HTMLEditor;
