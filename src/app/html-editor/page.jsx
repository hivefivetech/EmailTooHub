"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Editor } from "@tinymce/tinymce-react";

const fadeIn = (direction = "up", delay = 0) => ({
    hidden: { opacity: 0, y: direction === "up" ? 30 : direction === "down" ? -30 : 0 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            duration: 0.8,
            delay,
        },
    },
});

const HTMLEditor = () => {
    const editorRef = useRef(null);
    const [content, setContent] = useState("");

    return (
        <section className="section h-[1300px] xsm:h-[1200px] sm:h-full xl:h-[1000px] bg-[#fff] flex items-center" id="htmleditor">
            <div className="container mx-auto">
                <motion.h2
                    variants={fadeIn("down", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.6 }}
                    className="h2 text-center"
                >
                    HTML Editor - Free Web Component Composer
                </motion.h2>

                <motion.p
                    variants={fadeIn("down", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.6 }}
                    className="max-w-[800px] text-center mx-auto mb-5"
                >
                    Welcome to our free web content composer...
                </motion.p>

                <motion.div
                    variants={fadeIn("right", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.6 }}
                >
                    <div className="mt-12">
                        <Editor
                            apiKey="ugpif1xaemsbpzdfpee66fiqkz9hxh4ywls65tnnhw1hbobt"
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            init={{
                                plugins: [
                                    'code', 'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link',
                                    'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'checklist',
                                    'mediaembed', 'advcode', 'export', 'a11ychecker', 'advtemplate', 'form', 'input', 'button',
                                ],
                                toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist | table | code | input button',
                                menubar: "file edit view insert format tools table help",
                                height: 600,
                                resize: false,
                                content_style: `
                                    body { font-family: Arial, sans-serif; background-color: #f6f6f6; color: #333; }
                                    input[type="text"], textarea, button {
                                        width: 100%; padding: 10px; margin: 10px 0;
                                        border: 1px solid #ccc; border-radius: 4px;
                                        font-size: 16px; box-sizing: border-box;
                                    }
                                    input[type="button"], input[type="submit"], button {
                                        background-color: #0070ba; color: white; border: none;
                                        padding: 10px 20px; text-align: center; cursor: pointer;
                                        transition: background-color 0.3s;
                                    }
                                    input[type="button"]:hover, input[type="submit"]:hover, button:hover {
                                        background-color: #005f8a;
                                    }
                                    .container { width: 80%; max-width: 800px; margin: 20px auto; background-color: #fff; border: 1px solid #ddd; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                                    .header { background-color: #0070ba; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; }
                                    .invoice-title { font-size: 28px; font-weight: bold; color: #333; text-align: center; margin-bottom: 20px; }
                                    .invoice-info p { font-size: 16px; line-height: 1.6; }
                                    .highlight { background-color: #f9f9f9; padding: 10px; border-radius: 5px; }
                                    .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                                    .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 16px; }
                                    .table th { background-color: #0070ba; color: white; }
                                    .description-box { font-size: 18px; font-weight: bold; background-color: #f1f9ff; padding: 15px; border: 2px solid #0070ba; border-radius: 5px; text-align: center; }
                                    .total-amount { font-size: 24px; font-weight: bold; color: #0070ba; text-align: right; margin-top: 20px; }
                                    .footer { background-color: #0070ba; color: white; text-align: center; padding: 15px; font-size: 14px; margin-top: 30px; }
                                    .footer a { color: white; text-decoration: none; }
                                `,
                                table_default_attributes: {
                                    border: "1",
                                    cellpadding: "4",
                                    cellspacing: "0",
                                    width: "100%",
                                },
                                table_default_styles: {
                                    width: "100%",
                                    borderCollapse: "collapse",
                                },
                                valid_elements: "*[*]",
                                extended_valid_elements: "style[type|media]",
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
