import { Button, Card, CardBody, CardFooter } from '@nextui-org/react'

export default function Modal({ cardText, confirmAction, cancelAction }) {
  return (
    <div className='
        fixed 
        inset-0 
        z-50 
        flex 
        items-center 
        justify-center 
        overflow-x-hidden 
        overflow-y-auto 
        outline-none 
        focus:outline-none
        backdrop-blur-sm
    '>
        <Card>
            <CardBody>
                { cardText }
            </CardBody>
            <CardFooter>
                <Button color='danger' onClick={() => confirmAction()}>Yes</Button>
                <Button color='default' onClick={() => cancelAction(false)}>No</Button>
            </CardFooter>
        </Card>
    </div>
  )
}
