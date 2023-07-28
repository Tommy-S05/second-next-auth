'use client'

const Button = ({
                    label,
                    secondary,
                    fullWidth,
                    onClick,
                    large,
                    disabled,
                    outline,
                    // className,
                    
                }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-white text-black border-black' : 'bg-sky-500 text-white border-sky-500'}
                ${large ? 'py-3 px-5 text-xl' : 'py-2 px-4 text-md'}
                ${outline ? 'bg-transparent border-white text-white' : ''}
            `}
        >
            {label}
        </button>
    )
}

export default Button;