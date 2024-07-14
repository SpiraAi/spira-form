export const formSchema =  {
  id: "Sample Form",
  items: [
    {
      id: "agreementTitle",
      fields: [
        {
          id: "title",
          type: "heading",
          label: "Agreement Title",
          props: {
            level: 1,
          },
          required: true,
        },
      ],
    },
    {
      id: "introduction",
      label: "Introduction",
      guardrail: true,
      fields: [
        {
          id: "title",
          type: "heading",
          label: "Introduction Title",
          props: {
            level: 2,
          },
          required: true,
        },
        {
          id: "content",
          type: "content",
          label: "Introduction Content",
          required: true,
        },
      ],
    },
    {
      id: "clause",
      label: "Clause",
      fields: [
        {
          id: "title",
          type: "heading",
          label: "Title",
          props: {
            level: 2,
          },
          required: true,
        },
        {
          id: "content",
          type: "content",
          label: "Content",
          required: true,
        },
      ],
      min: 1,
      multiple: true,
      guardrail: true
    },
    {
      id: "execution",
      label: "Execution",
      guardrail: true,
      fields: [
        {
          id: "title",
          type: "heading",
          label: "Execution Title",
          props: {
            level: 2,
          },
          required: true,
        },
        {
          id: "content",
          type: "content",
          label: "Execution Content",
          required: true,
        },
      ],
    },
    {
      id: "schedule",
      label: "Schedule",
      guardrail: true,
      multiple: true,
      fields: [
        {
          id: "title",
          type: "heading",
          label: "Schedule Title",
          props: {
            level: 2,
          },
          required: true,
        },
        {
          id: "content",
          type: "content",
          label: "Schedule Content",
        },
        {
          id: "schedule-table",
          type: "table",
          label: "Schedule Table",
        },
      ],
    },
  ],
}