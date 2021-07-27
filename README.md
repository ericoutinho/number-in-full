# number-in-full

### Escreva números por extenso

Classe simples em Vanilla JS para retornar números por extenso com exibição da moeda opcional.

Utilize o segundo parâmetro como **true**, caso desejar que a moeda seja exibida (R$).

```
    let n = new NumberIF(number, true);
    console.log( n.readNumber() );
```

**Exemplo 1**: Escreva o número **12.500,35** por extenso.

```
    let n = new NumberIF("12,530.35");
    console.log( n.readNumber() );

    > doze mil, quinhentos e trinta e trinta e cinco
```

**Exemplo 2**: Escreva o mesmo número por extenso com exibição da moeda.

```
    let n = new NumberIF("12,530.35", true);
    console.log( n.readNumber() );

    > doze mil, quinhentos e trinta reais e trinta e cinco centavos
```
