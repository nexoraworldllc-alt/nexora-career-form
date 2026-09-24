/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL =
    "https://zfgduuwlsknbujrnrjfy.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_lnpSgPaLylEoXfdi7SqSxg_z-28zmak";


/* =========================================================
   CREATE SUPABASE CLIENT
========================================================= */

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   MAIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           CONFIGURATION
        ===================================================== */

        const SUPABASE_BUCKET =
            "nexora-applications";


        /* =====================================================
           GSAP
        ===================================================== */

        gsap.registerPlugin(
            ScrollTrigger
        );


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const form =
            document.getElementById(
                "careerForm"
            );

        const submitButton =
            document.getElementById(
                "submitButton"
            );

        const buttonText =
            document.querySelector(
                ".button-text"
            );

        const successMessage =
            document.getElementById(
                "successMessage"
            );

        const progressBar =
            document.getElementById(
                "progressBar"
            );

        const emailInput =
            document.getElementById(
                "email"
            );

        const replyTo =
            document.getElementById(
                "replyTo"
            );

        const iframe =
            document.getElementById(
                "formSubmitFrame"
            );


        /* =====================================================
           SAFETY CHECK
        ===================================================== */

        if (!form) {

            console.error(
                "careerForm was not found."
            );

            return;

        }


        /* =====================================================
           PAGE INTRO
        ===================================================== */

        const intro =
            gsap.timeline();


        intro.from(
            ".form-canvas",
            {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out"
            }
        );


        intro.from(
            ".logo-area",
            {
                opacity: 0,
                y: -20,
                duration: 0.6,
                ease: "power2.out"
            },
            "-=0.5"
        );


        intro.from(
            ".hero-content > *",
            {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out"
            },
            "-=0.3"
        );


        /* =====================================================
           SECTION REVEAL
        ===================================================== */

        gsap.utils
            .toArray(".reveal-section")
            .forEach(
                section => {

                    gsap.from(
                        section,
                        {
                            opacity: 0,
                            y: 60,
                            duration: 0.8,

                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                toggleActions:
                                    "play none none reverse"
                            }
                        }
                    );

                }
            );


        /* =====================================================
           SECTION NUMBERS
        ===================================================== */

        gsap.utils
            .toArray(".section-number")
            .forEach(
                number => {

                    gsap.from(
                        number,
                        {
                            scale: 0.7,
                            opacity: 0,
                            duration: 0.6,

                            scrollTrigger: {
                                trigger: number,
                                start: "top 85%"
                            }
                        }
                    );

                }
            );


        /* =====================================================
           UPLOAD CARD ANIMATION
        ===================================================== */

        gsap.utils
            .toArray(".upload-card")
            .forEach(
                (card, index) => {

                    gsap.from(
                        card,
                        {
                            opacity: 0,
                            y: 30,
                            duration: 0.6,
                            delay: index * 0.05,

                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%"
                            }
                        }
                    );

                }
            );


        /* =====================================================
           INPUT FOCUS
        ===================================================== */

        const fields =
            document.querySelectorAll(
                ".field input, .field select, .field textarea"
            );


        fields.forEach(
            field => {

                field.addEventListener(
                    "focus",
                    () => {

                        gsap.to(
                            field,
                            {
                                y: -2,
                                duration: 0.2,
                                ease: "power2.out"
                            }
                        );

                    }
                );


                field.addEventListener(
                    "blur",
                    () => {

                        gsap.to(
                            field,
                            {
                                y: 0,
                                duration: 0.2
                            }
                        );

                    }
                );

            }
        );


        /* =====================================================
           FILE PREVIEW
        ===================================================== */

        function handleFilePreview(
            inputId,
            previewId,
            imagePreview
        ) {

            const input =
                document.getElementById(
                    inputId
                );

            const preview =
                document.getElementById(
                    previewId
                );


            if (
                !input ||
                !preview
            ) {

                console.warn(
                    `Missing element: ${inputId} or ${previewId}`
                );

                return;

            }


            input.addEventListener(
                "change",
                () => {

                    preview.innerHTML =
                        "";


                    if (
                        !input.files.length
                    ) {

                        return;

                    }


                    Array.from(
                        input.files
                    ).forEach(
                        file => {

                            const wrapper =
                                document.createElement(
                                    "div"
                                );

                            wrapper.className =
                                "file-name";


                            if (
                                imagePreview &&
                                file.type.startsWith(
                                    "image/"
                                )
                            ) {

                                const image =
                                    document.createElement(
                                        "img"
                                    );

                                image.className =
                                    "preview-image";

                                image.src =
                                    URL.createObjectURL(
                                        file
                                    );

                                wrapper.appendChild(
                                    image
                                );

                            } else {

                                wrapper.textContent =
                                    "Selected: " +
                                    file.name;

                            }


                            preview.appendChild(
                                wrapper
                            );


                            gsap.from(
                                wrapper,
                                {
                                    opacity: 0,
                                    y: 10,
                                    duration: 0.4,
                                    ease: "power2.out"
                                }
                            );

                        }
                    );

                }
            );

        }


        /* =====================================================
           INITIALIZE FILE PREVIEWS
        ===================================================== */

        handleFilePreview(
            "fullPhoto",
            "fullPhotoPreview",
            true
        );


        handleFilePreview(
            "passportPhoto",
            "passportPreview",
            true
        );


        handleFilePreview(
            "cv",
            "cvPreview",
            false
        );


        handleFilePreview(
            "additionalFiles",
            "additionalPreview",
            false
        );


        /* =====================================================
           DRAG AND DROP
        ===================================================== */

        const uploadBoxes =
            document.querySelectorAll(
                ".upload-box"
            );


        uploadBoxes.forEach(
            box => {

                box.addEventListener(
                    "dragover",
                    event => {

                        event.preventDefault();


                        gsap.to(
                            box,
                            {
                                scale: 1.02,
                                duration: 0.2
                            }
                        );

                    }
                );


                box.addEventListener(
                    "dragleave",
                    () => {

                        gsap.to(
                            box,
                            {
                                scale: 1,
                                duration: 0.2
                            }
                        );

                    }
                );


                box.addEventListener(
                    "drop",
                    event => {

                        event.preventDefault();


                        gsap.to(
                            box,
                            {
                                scale: 1,
                                duration: 0.2
                            }
                        );


                        const input =
                            box.querySelector(
                                "input"
                            );


                        if (!input) {

                            return;

                        }


                        try {

                            input.files =
                                event.dataTransfer.files;


                            input.dispatchEvent(
                                new Event(
                                    "change"
                                )
                            );

                        } catch (
                            error
                        ) {

                            console.log(
                                "Drag and drop error:",
                                error
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           GET ALL FILES
        ===================================================== */

        function getAllFiles() {

            const fileInputs =
                document.querySelectorAll(
                    'input[type="file"]'
                );

            const files = [];


            fileInputs.forEach(
                input => {

                    Array.from(
                        input.files
                    ).forEach(
                        file => {

                            files.push(
                                {
                                    file: file,
                                    inputId: input.id
                                }
                            );

                        }
                    );

                }
            );


            return files;

        }


        /* =====================================================
           TOTAL FILE SIZE
        ===================================================== */

        function getTotalFileSize() {

            const files =
                getAllFiles();

            let total = 0;


            files.forEach(
                item => {

                    total +=
                        item.file.size;

                }
            );


            return total;

        }


        /* =====================================================
           FORMAT FILE SIZE
        ===================================================== */

        function formatMB(
            bytes
        ) {

            return (
                bytes /
                (1024 * 1024)
            ).toFixed(2);

        }


        /* =====================================================
           SAFE FILE NAME
        ===================================================== */

        function sanitizeFileName(
            fileName
        ) {

            return fileName
                .replace(
                    /[^a-zA-Z0-9._-]/g,
                    "_"
                );

        }


        /* =====================================================
           APPLICATION ID
        ===================================================== */

        function createApplicationId() {

            const timestamp =
                Date.now();

            const random =
                Math.random()
                    .toString(36)
                    .substring(
                        2,
                        8
                    );


            return (
                timestamp +
                "_" +
                random
            );

        }


        /* =====================================================
           FILE FOLDER
        ===================================================== */

        function getFileFolder(
            inputId
        ) {

            switch (
                inputId
            ) {

                case "fullPhoto":

                    return "full-photos";


                case "passportPhoto":

                    return "passport-photos";


                case "cv":

                    return "cv";


                case "additionalFiles":

                    return "additional-documents";


                default:

                    return "other";

            }

        }


        /* =====================================================
           UPLOAD ONE FILE
        ===================================================== */

        async function uploadFile(
            file,
            inputId,
            applicationId
        ) {

            const folder =
                getFileFolder(
                    inputId
                );


            const safeName =
                sanitizeFileName(
                    file.name
                );


            const filePath =
                applicationId +
                "/" +
                folder +
                "/" +
                Date.now() +
                "_" +
                safeName;


            const {
                data,
                error
            } =
                await supabaseClient
                    .storage
                    .from(
                        SUPABASE_BUCKET
                    )
                    .upload(
                        filePath,
                        file,
                        {
                            cacheControl:
                                "3600",

                            upsert:
                                false,

                            contentType:
                                file.type ||
                                "application/octet-stream"
                        }
                    );


            if (error) {

                console.error(
                    "Supabase upload error:",
                    error
                );

                throw error;

            }


            return {

                path:
                    data.path,

                originalName:
                    file.name,

                folder:
                    folder,

                size:
                    file.size,

                type:
                    file.type

            };

        }


        /* =====================================================
           UPLOAD ALL FILES
        ===================================================== */

        async function uploadAllFiles(
            applicationId
        ) {

            const files =
                getAllFiles();


            const uploadedFiles =
                [];


            for (
                const item
                of files
            ) {

                const uploaded =
                    await uploadFile(
                        item.file,
                        item.inputId,
                        applicationId
                    );


                uploadedFiles.push(
                    uploaded
                );

            }


            return uploadedFiles;

        }


        /* =====================================================
           CREATE HIDDEN INPUT
        ===================================================== */

        function createHiddenInput(
            name,
            value
        ) {

            let input =
                form.querySelector(
                    `input[name="${name}"]`
                );


            if (!input) {

                input =
                    document.createElement(
                        "input"
                    );

                input.type =
                    "hidden";

                input.name =
                    name;

                form.appendChild(
                    input
                );

            }


            input.value =
                value;


            return input;

        }


        /* =====================================================
           ADD UPLOADED FILE INFORMATION
        ===================================================== */

        function addUploadedFileInformation(
            uploadedFiles,
            applicationId
        ) {

            const fileInformation =
                uploadedFiles
                    .map(
                        (
                            item,
                            index
                        ) => {

                            return (
                                `${index + 1}. ` +
                                `Folder: ${item.folder} | ` +
                                `File: ${item.originalName} | ` +
                                `Supabase Path: ${item.path} | ` +
                                `Size: ${formatMB(item.size)} MB`
                            );

                        }
                    )
                    .join(
                        "\n"
                    );


            createHiddenInput(
                "Application ID",
                applicationId
            );


            createHiddenInput(
                "Uploaded Files",
                fileInformation ||
                "No files uploaded."
            );

        }


        /* =====================================================
           DISABLE FILE INPUTS
        ===================================================== */

        function disableFileInputs() {

            const fileInputs =
                form.querySelectorAll(
                    'input[type="file"]'
                );


            fileInputs.forEach(
                input => {

                    input.disabled =
                        true;

                }
            );

        }


        /* =====================================================
           ENABLE FILE INPUTS
        ===================================================== */

        function enableFileInputs() {

            const fileInputs =
                form.querySelectorAll(
                    'input[type="file"]'
                );


            fileInputs.forEach(
                input => {

                    input.disabled =
                        false;

                }
            );

        }


        /* =====================================================
           SUBMITTING STATE
        ===================================================== */

        let submitting =
            false;


        /* =====================================================
           FORM SUBMIT
        ===================================================== */

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                /* =============================================
                   PREVENT DOUBLE SUBMISSION
                ============================================= */

                if (
                    submitting
                ) {

                    return;

                }


                /* =============================================
                   VALIDATION
                ============================================= */

                if (
                    !form.checkValidity()
                ) {

                    form.reportValidity();


                    gsap.from(
                        ".field input:invalid, .field select:invalid, .field textarea:invalid",
                        {
                            x: -8,
                            duration: 0.08,
                            repeat: 5,
                            yoyo: true
                        }
                    );


                    return;

                }


                /* =============================================
                   FILE SIZE
                ============================================= */

                const totalSize =
                    getTotalFileSize();


                /*
                   Supabase bucket limit:
                   50 MB
                */

                const maxSize =
                    50 *
                    1024 *
                    1024;


                if (
                    totalSize >
                    maxSize
                ) {

                    alert(
                        "Your total uploaded files are " +
                        formatMB(
                            totalSize
                        ) +
                        " MB.\n\n" +
                        "Please keep the total file size below 50 MB."
                    );


                    return;

                }


                /* =============================================
                   SUPABASE CONFIG CHECK
                ============================================= */

                if (
                    !SUPABASE_URL ||
                    !SUPABASE_KEY ||
                    SUPABASE_URL.includes(
                        "YOUR_SUPABASE"
                    ) ||
                    SUPABASE_KEY.includes(
                        "YOUR_PUBLISHABLE_KEY"
                    )
                ) {

                    alert(
                        "Supabase is not configured yet.\n\n" +
                        "Please add your Project URL and Publishable key."
                    );


                    return;

                }


                /* =============================================
                   START
                ============================================= */

                submitting =
                    true;


                submitButton.classList.add(
                    "sending"
                );


                buttonText.textContent =
                    "UPLOADING FILES...";


                gsap.to(
                    ".button-arrow",
                    {
                        x: 8,
                        duration: 0.3,
                        repeat: -1,
                        yoyo: true
                    }
                );


                try {

                    /* =========================================
                       APPLICATION ID
                    ========================================= */

                    const applicationId =
                        createApplicationId();


                    /* =========================================
                       UPLOAD FILES
                    ========================================= */

                    const uploadedFiles =
                        await uploadAllFiles(
                            applicationId
                        );


                    /* =========================================
                       SAVE FILE INFORMATION
                    ========================================= */

                    addUploadedFileInformation(
                        uploadedFiles,
                        applicationId
                    );


                    /* =========================================
                       REPLY TO
                    ========================================= */

                    if (
                        replyTo &&
                        emailInput
                    ) {

                        replyTo.value =
                            emailInput.value;

                    }


                    /* =========================================
                       CHANGE BUTTON
                    ========================================= */

                    buttonText.textContent =
                        "SENDING APPLICATION...";


                    /* =========================================
                       DISABLE FILE INPUTS
                    ========================================= */

                    disableFileInputs();


                    /* =========================================
                       SEND FORMSUBMIT
                    ========================================= */

                    form.submit();

                } catch (
                    error
                ) {

                    console.error(
                        "Application submission error:",
                        error
                    );


                    submitting =
                        false;


                    enableFileInputs();


                    submitButton.classList.remove(
                        "sending"
                    );


                    buttonText.textContent =
                        "SUBMIT APPLICATION";


                    gsap.killTweensOf(
                        ".button-arrow"
                    );


                    gsap.to(
                        ".button-arrow",
                        {
                            x: 0,
                            duration: 0.3
                        }
                    );


                    alert(
                        "We could not upload your application files.\n\n" +
                        "Please check your internet connection and try again.\n\n" +
                        "If the problem continues, please contact us."
                    );

                }

            }
        );


        /* =====================================================
           FORMSUBMIT RESPONSE
        ===================================================== */

        if (iframe) {

            iframe.addEventListener(
                "load",
                () => {

                    if (
                        !submitting
                    ) {

                        return;

                    }


                    submitting =
                        false;


                    submitButton.classList.remove(
                        "sending"
                    );


                    buttonText.textContent =
                        "APPLICATION SENT ✓";


                    gsap.killTweensOf(
                        ".button-arrow"
                    );


                    gsap.to(
                        ".button-arrow",
                        {
                            x: 0,
                            duration: 0.3
                        }
                    );


                    if (
                        successMessage
                    ) {

                        successMessage.style.display =
                            "flex";


                        gsap.from(
                            successMessage,
                            {
                                opacity: 0,
                                y: 20,
                                duration: 0.6,
                                ease: "power3.out"
                            }
                        );

                    }

                }
            );

        }


        /* =====================================================
           SCROLL PROGRESS
        ===================================================== */

        window.addEventListener(
            "scroll",
            () => {

                if (
                    !progressBar
                ) {

                    return;

                }


                const scrollTop =
                    window.scrollY;


                const documentHeight =
                    document.documentElement
                        .scrollHeight -
                    window.innerHeight;


                const progress =
                    documentHeight > 0
                        ? (
                            scrollTop /
                            documentHeight
                        ) * 100
                        : 0;


                progressBar.style.width =
                    progress + "%";

            }
        );


        /* =====================================================
           BUTTON HOVER
        ===================================================== */

        if (
            submitButton
        ) {

            submitButton.addEventListener(
                "mouseenter",
                () => {

                    if (
                        submitting
                    ) {

                        return;

                    }


                    gsap.to(
                        ".button-arrow",
                        {
                            x: 8,
                            duration: 0.25,
                            ease: "power2.out"
                        }
                    );

                }
            );


            submitButton.addEventListener(
                "mouseleave",
                () => {

                    if (
                        submitting
                    ) {

                        return;

                    }


                    gsap.to(
                        ".button-arrow",
                        {
                            x: 0,
                            duration: 0.25
                        }
                    );

                }
            );

        }

    }
);