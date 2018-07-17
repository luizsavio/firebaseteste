import { Injectable } from '@angular/core';
declare var db;
/*
  Generated class for the FirestoreServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreServiceProvider {
  public array: Array<any>;
  constructor() {
    this.array = new Array();
  }
  // se o documento ja existir sera substituido pela coleção nova
  gravarDadosSemGerarIdAutomatico(colecao: string, documentoId: string, objeto: object) {
    return new Promise((resolve, reject) => {
      db.collection(colecao).doc(documentoId).set(objeto)
        .then(() => {
          resolve();
          console.log("Document successfully written!");
        })
        .catch((error) => {
          reject(error);
          console.error("Error writing document: ", error);
        });
    });
  }

  gravarDadosGerarIdAutomatico(colecao: string, objeto: object) {
    return new Promise((resolve, reject) => {
      db.collection(colecao).add(objeto)
        .then((docRef) => {
          resolve(docRef);
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          reject(error);
          console.error("Error adding document: ", error);
        });
    });
  }
  //timestamp: firebase.firestore.FieldValue.serverTimestamp() - 
  //adicionar carimbos de data/hora do servidor a campos específicos
  // nos seus documentos para rastrear quando uma atualização foi recebida pelo servidor
  atualizarDocumento(colecao: string, documentoId: string, objeto: object) {
    return new Promise((resolve, reject) => {
      // Set the "capital" field of the city 'DC'
      return db.collection(colecao).doc(documentoId).update(objeto)
        .then(() => {
          resolve();
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          reject(error);
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
  }

  excluirDocumento(colecao: string, documentoId: string) {
    return new Promise((resolve, reject) => {
      db.collection(colecao).doc(documentoId).delete()
        .then(() => {
          resolve();
          console.log("Document successfully deleted!");
        }).catch((error) => {
          reject(error);
          console.error("Error removing document: ", error);
        });
    });
  }

  receberUmDocumento(colecao: string, documentoId: string) {
    return new Promise((resolve, reject) => {
      db.collection(colecao).doc(documentoId).get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          resolve(doc);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
        reject(error);
      });
    });
  }

  receberTodosDocumentosColecao(colecao: string) {
    
    return new Promise((resolve, reject) => {
      db.collection(colecao).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var objeto = doc.data();
          this.array.push(objeto);
          resolve(this.array);
        });
      }).catch(function (error) {
        reject(error);
        console.log("Error getting documents: ", error);
      });
    })

  }

}
