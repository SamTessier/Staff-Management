const form = {
    title:{
        name: {
            label: 'Name:',
            Component: 'Typography',
            props: {
                variant: 'h6',
            },
        }
    },
    content:{
        name: {
            label: 'Name:',
            Component: 'Typography',
            props: {
                variant: 'h6',
            },
        }
    },
    actions: {
        handleClose: {
            label: 'Close',
            Component: 'Button',
            onClick: actions.handleClose,
        }
    }
}