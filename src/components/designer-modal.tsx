import React from 'react'
import '../styles/designer-modal.css'

export interface ModalProps {
    show: boolean
    handleClose: any
}
export interface ModalState {
    modalOpen: boolean
}
export class DesignerModal extends React.Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props)
        this.state = {
            modalOpen: false,
        }
    }

    render() {
        return (
            <div
                className={
                    'designer-modal ' + (this.props.show ? 'd-block' : 'd-none')
                }
                onClick={this.props.handleClose}
            >
                <div className="modal-card">
                    <blockquote className="twitter-tweet">
                        <p lang="en" dir="ltr">
                            Day 4 of the
                            <a href="https://twitter.com/hashtag/DailyUI?src=hash&amp;ref_src=twsrc%5Etfw">
                                #DailyUI
                            </a>
                            challenge <br />A calculator interface in dark mode
                            and light mode... i tried 😅
                            <a href="https://t.co/dNDBbOvmpZ">
                                pic.twitter.com/dNDBbOvmpZ
                            </a>
                        </p>
                        &mdash; AkosuaAsamoah 🤤🤞🏽 (@aa_franklina)
                        <a href="https://twitter.com/aa_franklina/status/1268182634687070208?ref_src=twsrc%5Etfw">
                            June 3, 2020
                        </a>
                    </blockquote>
                </div>
            </div>
        )
    }
}
