import React from 'react';
import * as R from 'ramda';

const isReactClassComponent = c => typeof c === 'function' && !!c.prototype.isReactComponent;

export const ModalContext = React.createContext(null);
export const ModalContainerContext = React.createContext(null);

const withModals = (BaseComponent) => {
  /*if (!isReactClassComponent(BaseComponent)) {
    throw new Error('modalable should be used with React.Component or PureComponent only.');
  }*/

  return class ModalWrapper extends BaseComponent {
    componentDidMount(...args) {
      super.componentDidMount?.apply(this, args);

      if (this.props.history) {
        const processLocation = (location) => {
          const hash = location.hash.slice(1);

          if (hash === '') {
            R.forEachObjIndexed(
              (v, k) => {
                if (v.hashRoute) {
                  this.closeModal(k);
                }
              },
              super.modals(),
            );
          }

          if (hash && super.modals()[hash]) {
            // check hashRoute
            // loading line - ???
            this.openModal(hash);
          }
        };

        this.modalWrapperRouterHistoryListenerUnlisten =
          this.props.history.listen(processLocation);

        processLocation(this.props.history.location);
      }

      window.addEventListener('keydown', this.onModalKeyDown);
    }

    componentWillUnmount(...args) {
      super.componentWillUnmount?.apply(this, args);

      if (this.modalWrapperRouterHistoryListenerUnlisten) {
        this.modalWrapperRouterHistoryListenerUnlisten();
      }

      window.removeEventListener('keydown', this.onModalKeyDown);
    }

    onModalKeyDown = (event) => {
      if (event.key === 'Escape' && this.isModalShown()) {
        this.closeModal();
      }
    };

    modalArgs = (name) => {
      const { modals } = this.state;
      return modals[name] ? modals[name].args : null;
    };

    openModal = (name, args) => {
      this.setState({
        modals: {
          0: {
            showedModal: name,
          },
          [name]: {
            args,
          },
        },
      });
    };

    currentModal = () => this.state?.modals?.[0]?.showedModal;
    isModalShown = () => Boolean(this.currentModal());

    closeModal = () => {
      const currentModal = this.currentModal();

      if (!currentModal) {
        return;
      }

      this.setState({
        modals: {
          0: null,
          [currentModal]: {
            args: null,
          },
        },
      }, () => {
        const { history } = this.props;
        const { location } = history;
        const hash = location.hash.slice(1);

        if (hash && super.modals()[hash]) {
          history.replace({ pathname: location.pathname, hash: '' });
        }
      });
    };

    modalWrapper = (name, body, args) => {
      const wrappedBody = typeof body === 'function'
        ? body({ modalArguments: args }) : React.cloneElement(body, { modalArguments: args });

      return (
        <div
          style={{
            top: 0,
            left: 0,
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 990,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => this.closeModal()}
          onScroll={(e) => { e.preventDefault(); }}
        >
          <ModalContext.Provider
            value={{
              closeModal: () => { this.closeModal(); },
            }}
          >
            {wrappedBody}
          </ModalContext.Provider>
        </div>
      );
    };

    renderModal() {
      const modalDescriptions = super.modals();
      const modalStates = this.state?.modals;

      if (!modalStates || !this.currentModal()) {
        return null;
      }

      const modalDesc = modalDescriptions[this.currentModal()];

      return this.modalWrapper(
        this.currentModal(),
        modalDesc.condition === undefined || modalDesc.condition() === true
          ? modalDesc.body
          : (
            () => {}
          ),
        modalStates[this.currentModal()]?.args,
      );

      return null;
    }

    render() {
      return (
        <>
          <ModalContainerContext.Provider
            value={{
              closeModal: () => { this.closeModal(); },
              isModalShown: this.isModalShown(),
            }}
          >
            {super.render()}
          </ModalContainerContext.Provider>
          {this.renderModal()}
        </>
      );
    }
  };
};

export default withModals;
