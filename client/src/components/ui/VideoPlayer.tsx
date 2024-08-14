import ReactPlayer from 'react-player';

interface VideoPlayerProps {
    src: string | undefined,
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
    return (
        <div className='h-[50vh] w-full'>
            <ReactPlayer
                url={src}
                className="react-player"
                controls={true}
                style={{ pointerEvents: 'auto' }}
            />
        </div>

    )
}