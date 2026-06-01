import { config, singleton, fields } from '@keystatic/core';

const textField = (label: string) => fields.text({ label });
const multilineField = (label: string) => fields.text({ label, multiline: true });

export default config({
    storage: { kind: 'local' },
    ui: { brand: { name: 'Tangible CMS' } },

    singletons: {
        // ─── Home ───────────────────────────────────────────────────────────
        home: singleton({
            label: 'Home Page',
            path: 'src/content/home',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        aboutSectionLabel: textField('About — Section Label'),
                        aboutBody: multilineField('About — Body (after "Tangible" prefix)'),
                        aboutButton: textField('About — Button'),
                        missionQuote: multilineField('Mission Quote'),
                        programsSectionLabel: textField('Programs — Section Label'),
                        entreprisesTitle1: textField('Entreprises — Title Line 1'),
                        entreprisesTitle2: textField('Entreprises — Title Line 2'),
                        entreprisesBody: multilineField('Entreprises — Body'),
                        entreprisesResult: textField('Entreprises — Result phrase'),
                        entreprisesButton: textField('Entreprises — Button'),
                        leadersTitle1: textField('Leaders — Title Line 1'),
                        leadersTitle2: textField('Leaders — Title Line 2'),
                        leadersBody: multilineField('Leaders — Body'),
                        leadersAmbition: textField('Leaders — Ambition phrase'),
                        leadersButton: textField('Leaders — Button'),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        aboutSectionLabel: textField('About — Section Label'),
                        aboutBody: multilineField('About — Body (after "Tangible" prefix)'),
                        aboutButton: textField('About — Button'),
                        missionQuote: multilineField('Mission Quote'),
                        programsSectionLabel: textField('Programs — Section Label'),
                        entreprisesTitle1: textField('Entreprises — Title Line 1'),
                        entreprisesTitle2: textField('Entreprises — Title Line 2'),
                        entreprisesBody: multilineField('Entreprises — Body'),
                        entreprisesResult: textField('Entreprises — Result phrase'),
                        entreprisesButton: textField('Entreprises — Button'),
                        leadersTitle1: textField('Leaders — Title Line 1'),
                        leadersTitle2: textField('Leaders — Title Line 2'),
                        leadersBody: multilineField('Leaders — Body'),
                        leadersAmbition: textField('Leaders — Ambition phrase'),
                        leadersButton: textField('Leaders — Button'),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'English' }
                )
            }
        }),

        // ─── About ──────────────────────────────────────────────────────────
        about: singleton({
            label: 'About Page',
            path: 'src/content/about',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        heroSectionLabel: textField('Hero — Section Label'),
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        heroLine4: textField('Hero Line 4'),
                        introParagraph1: multilineField(
                            'Intro — Paragraph 1 (after "Tangible" prefix)'
                        ),
                        introParagraph2: multilineField('Intro — Paragraph 2'),
                        approachSectionLabel: textField('Approach — Section Label'),
                        circleLabel1: textField('Circle 1 Label'),
                        circleLabel2: textField('Circle 2 Label'),
                        circleLabel3: textField('Circle 3 Label'),
                        approachBody: multilineField('Approach — Body'),
                        visionSectionLabel: textField('Vision — Section Label'),
                        visionQuote: multilineField('Vision — Quote'),
                        promiseSectionLabel: textField('Promise — Section Label'),
                        promiseIntro: textField('Promise — Intro line'),
                        promiseItems: fields.array(fields.text({ label: 'Item' }), {
                            label: 'Promise Items'
                        }),
                        ronName: textField('Ron — Name'),
                        ronTitle: textField('Ron — Title (use \\n for line break)'),
                        ronBio: multilineField('Ron — Bio'),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        heroSectionLabel: textField('Hero — Section Label'),
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        heroLine4: textField('Hero Line 4'),
                        introParagraph1: multilineField(
                            'Intro — Paragraph 1 (after "Tangible" prefix)'
                        ),
                        introParagraph2: multilineField('Intro — Paragraph 2'),
                        approachSectionLabel: textField('Approach — Section Label'),
                        circleLabel1: textField('Circle 1 Label'),
                        circleLabel2: textField('Circle 2 Label'),
                        circleLabel3: textField('Circle 3 Label'),
                        approachBody: multilineField('Approach — Body'),
                        visionSectionLabel: textField('Vision — Section Label'),
                        visionQuote: multilineField('Vision — Quote'),
                        promiseSectionLabel: textField('Promise — Section Label'),
                        promiseIntro: textField('Promise — Intro line'),
                        promiseItems: fields.array(fields.text({ label: 'Item' }), {
                            label: 'Promise Items'
                        }),
                        ronName: textField('Ron — Name'),
                        ronTitle: textField('Ron — Title (use \\n for line break)'),
                        ronBio: multilineField('Ron — Bio'),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'English' }
                )
            }
        }),

        // ─── Programs ───────────────────────────────────────────────────────
        programs: singleton({
            label: 'Programs Page',
            path: 'src/content/programs',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        pageTitle: textField('Page Title'),
                        entreprisesTitle1: textField('Entreprises — Title Line 1'),
                        entreprisesTitle2: textField('Entreprises — Title Line 2'),
                        entreprisesBody: multilineField('Entreprises — Body'),
                        entreprisesResult: textField('Entreprises — Result phrase'),
                        entreprisesButton: textField('Entreprises — Button'),
                        leadersTitle1: textField('Leaders — Title Line 1'),
                        leadersTitle2: textField('Leaders — Title Line 2'),
                        leadersBody: multilineField('Leaders — Body'),
                        leadersAmbition: textField('Leaders — Ambition phrase'),
                        leadersButton: textField('Leaders — Button'),
                        quote: multilineField('Quote'),
                        quoteAuthor: textField('Quote Author'),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        pageTitle: textField('Page Title'),
                        entreprisesTitle1: textField('Entreprises — Title Line 1'),
                        entreprisesTitle2: textField('Entreprises — Title Line 2'),
                        entreprisesBody: multilineField('Entreprises — Body'),
                        entreprisesResult: textField('Entreprises — Result phrase'),
                        entreprisesButton: textField('Entreprises — Button'),
                        leadersTitle1: textField('Leaders — Title Line 1'),
                        leadersTitle2: textField('Leaders — Title Line 2'),
                        leadersBody: multilineField('Leaders — Body'),
                        leadersAmbition: textField('Leaders — Ambition phrase'),
                        leadersButton: textField('Leaders — Button'),
                        quote: multilineField('Quote'),
                        quoteAuthor: textField('Quote Author'),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'English' }
                )
            }
        }),

        // ─── Contact ────────────────────────────────────────────────────────
        contact: singleton({
            label: 'Contact Page',
            path: 'src/content/contact',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        heroLine4: textField('Hero Line 4'),
                        introBold: multilineField('Intro — Bold sentence'),
                        introBody: multilineField('Intro — Body'),
                        email: textField('Email address'),
                        phone: textField('Phone number'),
                        fieldName: textField('Form — Name label'),
                        fieldEmail: textField('Form — Email label'),
                        fieldPhone: textField('Form — Phone label'),
                        fieldMessage: textField('Form — Message label'),
                        checkboxLabel: textField('Form — Checkbox label'),
                        submitButton: textField('Form — Submit button')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        introBold: multilineField('Intro — Bold sentence'),
                        introBody: multilineField('Intro — Body'),
                        email: textField('Email address'),
                        phone: textField('Phone number'),
                        fieldName: textField('Form — Name label'),
                        fieldEmail: textField('Form — Email label'),
                        fieldPhone: textField('Form — Phone label'),
                        fieldMessage: textField('Form — Message label'),
                        checkboxLabel: textField('Form — Checkbox label'),
                        submitButton: textField('Form — Submit button')
                    },
                    { label: 'English' }
                )
            }
        }),

        // ─── Services — Entreprises ─────────────────────────────────────────
        servicesEntreprises: singleton({
            label: 'Services — Entreprises',
            path: 'src/content/services-entreprises',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        introParagraph: multilineField('Intro — Main Paragraph'),
                        introResult: textField('Intro — Result phrase (bold:rest)'),
                        slides: fields.array(
                            fields.object(
                                {
                                    shapeTitle: multilineField('Shape Title (line 1 ↵ line 2)'),
                                    descriptions: fields.array(
                                        fields.object(
                                            {
                                                title: textField('Title'),
                                                text: multilineField('Text')
                                            },
                                            { label: 'Description' }
                                        ),
                                        { label: 'Descriptions' }
                                    )
                                },
                                { label: 'Slide' }
                            ),
                            { label: 'Slides' }
                        ),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        introParagraph: multilineField('Intro — Main Paragraph'),
                        introResult: textField('Intro — Result phrase (bold:rest)'),
                        slides: fields.array(
                            fields.object(
                                {
                                    shapeTitle: multilineField('Shape Title (line 1 ↵ line 2)'),
                                    descriptions: fields.array(
                                        fields.object(
                                            {
                                                title: textField('Title'),
                                                text: multilineField('Text')
                                            },
                                            { label: 'Description' }
                                        ),
                                        { label: 'Descriptions' }
                                    )
                                },
                                { label: 'Slide' }
                            ),
                            { label: 'Slides' }
                        ),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'English' }
                )
            }
        }),

        // ─── Services — Leaders ──────────────────────────────────────────────
        servicesLeaders: singleton({
            label: 'Services — Leaders',
            path: 'src/content/services-leaders',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        introParagraph: multilineField('Intro — Paragraph'),
                        slides: fields.array(
                            fields.object(
                                {
                                    shapeTitle: multilineField('Shape Title (line 1 ↵ line 2)'),
                                    descriptions: fields.array(
                                        fields.object(
                                            {
                                                title: textField('Title'),
                                                text: multilineField('Text')
                                            },
                                            { label: 'Description' }
                                        ),
                                        { label: 'Descriptions' }
                                    )
                                },
                                { label: 'Slide' }
                            ),
                            { label: 'Slides' }
                        ),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        introParagraph: multilineField('Intro — Paragraph'),
                        slides: fields.array(
                            fields.object(
                                {
                                    shapeTitle: multilineField('Shape Title (line 1 ↵ line 2)'),
                                    descriptions: fields.array(
                                        fields.object(
                                            {
                                                title: textField('Title'),
                                                text: multilineField('Text')
                                            },
                                            { label: 'Description' }
                                        ),
                                        { label: 'Descriptions' }
                                    )
                                },
                                { label: 'Slide' }
                            ),
                            { label: 'Slides' }
                        ),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'English' }
                )
            }
        }),

        // ─── Centre I AM ─────────────────────────────────────────────────────
        centreIam: singleton({
            label: 'Centre I AM Page',
            path: 'src/content/centre-iam',
            format: { data: 'json' },
            schema: {
                fr: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        heroLine4: textField('Hero Line 4 (optional)'),
                        aboutSectionLabel: textField('About — Section Label'),
                        aboutBody: multilineField('About — Body'),
                        servicesSectionLabel: textField('Services — Section Label'),
                        slides: fields.array(
                            fields.object(
                                {
                                    title: textField('Service Title'),
                                    description: multilineField('Description')
                                },
                                { label: 'Slide' }
                            ),
                            { label: 'Service Slides' }
                        ),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'Français' }
                ),
                en: fields.object(
                    {
                        heroLine1: textField('Hero Line 1'),
                        heroLine2: textField('Hero Line 2'),
                        heroLine3: textField('Hero Line 3'),
                        heroLine4: textField('Hero Line 4 (optional)'),
                        aboutSectionLabel: textField('About — Section Label'),
                        aboutBody: multilineField('About — Body'),
                        servicesSectionLabel: textField('Services — Section Label'),
                        slides: fields.array(
                            fields.object(
                                {
                                    title: textField('Service Title'),
                                    description: multilineField('Description')
                                },
                                { label: 'Slide' }
                            ),
                            { label: 'Service Slides' }
                        ),
                        contactFooterHeading: textField('Contact Footer — Heading')
                    },
                    { label: 'English' }
                )
            }
        })
    }
});
