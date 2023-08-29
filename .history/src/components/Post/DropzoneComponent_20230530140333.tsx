import React from 'react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

// type DropzoneProps = {
    
// };

const DropzoneComponent:React.FC = () => {
    
    return (<>
     <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      
    >
      
        {/* <Dropzone.Accept>
       
        </Dropzone.Accept>
        <Dropzone.Reject>
         
        </Dropzone.Reject>
        <Dropzone.Idle>
         
        </Dropzone.Idle> */}

        <div>
          
            Drag images here or click to select files
          
          
            Attach as many files as you like, each file should not exceed 5mb
          
        </div>
      
    </Dropzone>

    </>)
}
export default DropzoneComponent;