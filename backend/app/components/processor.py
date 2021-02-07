from ..api import _v1
from pathlib import Path
from app.error import Error
import pandas as pd
from app.components._data import dataframeHandler
import numpy as np

# id del componente
componentId = "processor"
# Nombre del componente
componentName = "Processor"
# Descripción del componente
componentDescription = "Procesado de datos"
# Nombre de la opción en la interfaz
componentInterfaceName = "Procesar..."
# Acciones que puede realizar el componente y parámetros que genera la interfaz
Actions = [_v1.Action(
                      name="averageImputing", 
                      description="Imputación de datos faltantes en base a la media de la columna", 
                      params=[
                        _v1.Param(name="axis", kind="number"),
                      ]),
            _v1.Action(
                      name="mostFrecuencyImputing",
                      description="Imputación de datos faltantes en base al valor más frecuente", 
                      params=[

                      ]),
            _v1.Action(
                      name="interpolationImputing",
                      description="Imputación de datos faltantes utilizando una interpolación", 
                      params=[

                      ])
          ]
## Component processor
## This component handle the datasets import into the project
class Processor:
    # constructor which initialize handlers and defined actions
    def __init__(self):
        self.actions = {
            "default": self.defaultHandler,
            "averageImputing": self.averageImputingHandler,
            "mostFrecuencyImputing": self.mostFrecuencyImputingHandler,
            "interpolationImputing": self.interpolationImputingHandler
        }
        self.pagination = {
            "startRow": None,
            "endRow": None,
        }
        
    # Update pagination params from request
    def _updatePagination (self, request: any):
        startRowParam = request.args.get('startRow')
        endRowParam = request.args.get('endRow')
        self.pagination["startRow"] = None if startRowParam is None else int(startRowParam)
        self.pagination["endRow"]= None if endRowParam is None else int(endRowParam)
        
    # default application handle which allow to import files though file handlers
    def defaultHandler(self, request):
        console.log("defaultHandler")

    def averageImputingHandler(self, request):
        df = dataframeHandler.getDataframe()
        column = request.form.get('column')
        axis = request.form.get('axis')
        print("axis: ", axis)
        print("column: ", column)
        df[[column]] = df[[column]].fillna(df.mean(axis=int(axis)))
        pd.set_option("max_columns", None) # show all cols
        dataframeHandler.saveDataframe(df)

    def mostFrecuencyImputingHandler(self, request):
        print("mostFrecuencyImputingHandler")
        df = dataframeHandler.getDataframe()
        column = request.form.get('column')
        df[[column]] = df[[column]].fillna(df[[column]].mode().iloc[0])
        pd.set_option("max_columns", None) # show all cols
        dataframeHandler.saveDataframe(df)

    def interpolationImputingHandler(self, request):
        df = dataframeHandler.getDataframe()
        column = request.form.get('column')
        
        df = df.interpolate(method='polynomial', order=2, axis=0)

        print("fin interpolación")
        pd.set_option("max_columns", None) # show all cols
        dataframeHandler.saveDataframe(df)

    # call function triggered
    def __call__(self, request: any):
        self._updatePagination(request)
        action = request.args.get("action")
        print("accion: ", action)
        if action is None:
            self.actions["default"](request)
        elif action not in self.actions:
            raise Error('Accion {} desconocida'.format(action))
        else:
            self.actions[action](request)
        return dataframeHandler.getAllData(self.pagination)

# component registration in the internal api
component = _v1.Component(name=componentName, description=componentDescription, interfacename=componentInterfaceName, actions=Actions, handler_class=Processor)
_v1.register_component(component)